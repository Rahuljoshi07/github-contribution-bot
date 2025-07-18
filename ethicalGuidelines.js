const fs = require('fs');
const path = require('path');

// Ethical guidelines and rate limiting class
class EthicalGuidelines {
  constructor(config) {
    this.config = config;
    this.rateLimit = {
      issuesPerHour: 5,
      prsPerHour: 3,
      commentsPerHour: 10,
      totalPerDay: 50,
      cooldownPeriod: 300000 // 5 minutes in ms
    };
    this.activityLog = this.loadActivityLog();
  }

  // Load activity log from file
  loadActivityLog() {
    try {
      const logFile = path.join(__dirname, 'activity_log.json');
      if (fs.existsSync(logFile)) {
        return JSON.parse(fs.readFileSync(logFile, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading activity log:', error);
    }
    return {
      daily: {},
      hourly: {},
      lastActivity: null,
      repositories: {}
    };
  }

  // Save activity log to file
  saveActivityLog() {
    try {
      const logFile = path.join(__dirname, 'activity_log.json');
      fs.writeFileSync(logFile, JSON.stringify(this.activityLog, null, 2));
    } catch (error) {
      console.error('Error saving activity log:', error);
    }
  }

  // Check if we can perform an action
  canPerformAction(actionType, repoName) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    
    // Initialize logs if they don't exist
    if (!this.activityLog.daily[today]) {
      this.activityLog.daily[today] = { issues: 0, prs: 0, comments: 0, total: 0 };
    }
    
    const hourKey = `${today}-${currentHour}`;
    if (!this.activityLog.hourly[hourKey]) {
      this.activityLog.hourly[hourKey] = { issues: 0, prs: 0, comments: 0 };
    }

    // Check repository-specific limits
    if (!this.activityLog.repositories[repoName]) {
      this.activityLog.repositories[repoName] = {
        lastActivity: null,
        totalContributions: 0,
        dailyContributions: 0,
        lastContributionDate: null
      };
    }

    const repoData = this.activityLog.repositories[repoName];
    const dailyData = this.activityLog.daily[today];
    const hourlyData = this.activityLog.hourly[hourKey];

    // Check cooldown period
    if (this.activityLog.lastActivity) {
      const timeSinceLastActivity = now - new Date(this.activityLog.lastActivity);
      if (timeSinceLastActivity < this.rateLimit.cooldownPeriod) {
        return {
          allowed: false,
          reason: `Cooldown period active. Wait ${Math.ceil((this.rateLimit.cooldownPeriod - timeSinceLastActivity) / 1000)} seconds.`
        };
      }
    }

    // Check daily limits
    if (dailyData.total >= this.rateLimit.totalPerDay) {
      return {
        allowed: false,
        reason: `Daily limit reached (${this.rateLimit.totalPerDay} actions per day)`
      };
    }

    // Check hourly limits
    switch (actionType) {
      case 'issue':
        if (hourlyData.issues >= this.rateLimit.issuesPerHour) {
          return {
            allowed: false,
            reason: `Hourly issue limit reached (${this.rateLimit.issuesPerHour} per hour)`
          };
        }
        break;
      case 'pr':
        if (hourlyData.prs >= this.rateLimit.prsPerHour) {
          return {
            allowed: false,
            reason: `Hourly PR limit reached (${this.rateLimit.prsPerHour} per hour)`
          };
        }
        break;
      case 'comment':
        if (hourlyData.comments >= this.rateLimit.commentsPerHour) {
          return {
            allowed: false,
            reason: `Hourly comment limit reached (${this.rateLimit.commentsPerHour} per hour)`
          };
        }
        break;
    }

    // Check repository-specific limits (max 3 contributions per repo per day)
    if (repoData.lastContributionDate === today && repoData.dailyContributions >= 3) {
      return {
        allowed: false,
        reason: `Repository daily limit reached (max 3 contributions per repo per day)`
      };
    }

    return { allowed: true };
  }

  // Record an action
  recordAction(actionType, repoName) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const hourKey = `${today}-${currentHour}`;

    // Update logs
    this.activityLog.daily[today][actionType]++;
    this.activityLog.daily[today].total++;
    this.activityLog.hourly[hourKey][actionType]++;
    this.activityLog.lastActivity = now.toISOString();

    // Update repository data
    const repoData = this.activityLog.repositories[repoName];
    repoData.lastActivity = now.toISOString();
    repoData.totalContributions++;
    
    if (repoData.lastContributionDate !== today) {
      repoData.dailyContributions = 1;
      repoData.lastContributionDate = today;
    } else {
      repoData.dailyContributions++;
    }

    this.saveActivityLog();
    console.log(`📊 Recorded ${actionType} action for ${repoName}`);
  }

  // Check if repository is suitable for contribution
  isRepositorySuitable(repo) {
    const guidelines = {
      minStars: 5,
      maxStars: 10000,
      minForks: 2,
      hasIssues: true,
      hasReadme: true,
      hasContributing: false, // Optional
      recentActivity: 90 // days
    };

    // Check basic requirements
    if (repo.stargazers_count < guidelines.minStars) {
      return { suitable: false, reason: 'Too few stars (likely inactive)' };
    }

    if (repo.stargazers_count > guidelines.maxStars) {
      return { suitable: false, reason: 'Too many stars (likely overwhelmed with contributions)' };
    }

    if (repo.forks_count < guidelines.minForks) {
      return { suitable: false, reason: 'Too few forks (low community interest)' };
    }

    if (!repo.has_issues) {
      return { suitable: false, reason: 'Issues disabled' };
    }

    // Check recent activity
    const lastUpdate = new Date(repo.updated_at);
    const daysSinceUpdate = (new Date() - lastUpdate) / (1000 * 60 * 60 * 24);
    
    if (daysSinceUpdate > guidelines.recentActivity) {
      return { suitable: false, reason: 'Repository inactive for too long' };
    }

    // Check if repository is archived
    if (repo.archived) {
      return { suitable: false, reason: 'Repository is archived' };
    }

    return { suitable: true };
  }

  // Validate contribution quality
  validateContribution(contributionData) {
    const { type, content, repo } = contributionData;
    
    const qualityChecks = {
      minLength: 20,
      maxLength: 2000,
      hasCodeExample: false,
      hasProperFormatting: true,
      isRelevant: true
    };

    // Check content length
    if (content.length < qualityChecks.minLength) {
      return { valid: false, reason: 'Contribution too short (lacks substance)' };
    }

    if (content.length > qualityChecks.maxLength) {
      return { valid: false, reason: 'Contribution too long (may be spam)' };
    }

    // Check for spam patterns
    const spamPatterns = [
      /(.)\1{10,}/,  // Repeated characters
      /https?:\/\/[^\s]+/gi,  // URLs (be careful with this)
      /\b(buy|sell|cheap|discount|offer|deal)\b/gi,  // Commercial terms
      /\b(first|second|third|fourth|fifth)\b.*\b(first|second|third|fourth|fifth)\b/gi  // Repetitive numbering
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(content)) {
        return { valid: false, reason: 'Content appears to be spam' };
      }
    }

    // Check relevance to repository
    if (repo.language) {
      const languageTerms = {
        'JavaScript': ['js', 'javascript', 'node', 'react', 'vue', 'angular'],
        'Python': ['python', 'py', 'django', 'flask', 'pandas', 'numpy'],
        'Java': ['java', 'spring', 'maven', 'gradle', 'jvm'],
        'C++': ['cpp', 'c++', 'cmake', 'gcc', 'clang'],
        'Go': ['go', 'golang', 'goroutine', 'gin', 'fiber']
      };

      const relevantTerms = languageTerms[repo.language] || [];
      const hasRelevantTerms = relevantTerms.some(term => 
        content.toLowerCase().includes(term.toLowerCase())
      );

      if (!hasRelevantTerms && relevantTerms.length > 0) {
        return { valid: false, reason: 'Content not relevant to repository language' };
      }
    }

    return { valid: true };
  }

  // Get contribution recommendations
  getContributionRecommendations(repo) {
    const recommendations = [];

    // Check if repo needs documentation
    if (!repo.description || repo.description.length < 50) {
      recommendations.push({
        type: 'issue',
        title: 'Improve repository description',
        priority: 'medium',
        description: 'The repository would benefit from a more detailed description'
      });
    }

    // Check if repo has basic files
    const basicFiles = ['README.md', 'LICENSE', 'CONTRIBUTING.md', '.gitignore'];
    basicFiles.forEach(file => {
      recommendations.push({
        type: 'issue',
        title: `Add ${file} if missing`,
        priority: 'low',
        description: `Check if ${file} exists and is properly formatted`
      });
    });

    // Language-specific recommendations
    if (repo.language === 'JavaScript') {
      recommendations.push({
        type: 'pr',
        title: 'Add ESLint configuration',
        priority: 'medium',
        description: 'Improve code quality with ESLint setup'
      });
    }

    if (repo.language === 'Python') {
      recommendations.push({
        type: 'pr',
        title: 'Add requirements.txt or setup.py',
        priority: 'high',
        description: 'Improve dependency management'
      });
    }

    return recommendations;
  }

  // Clean up old logs (keep only last 30 days)
  cleanupOldLogs() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Clean daily logs
    for (const date in this.activityLog.daily) {
      if (new Date(date) < thirtyDaysAgo) {
        delete this.activityLog.daily[date];
      }
    }

    // Clean hourly logs
    for (const hourKey in this.activityLog.hourly) {
      const date = hourKey.split('-').slice(0, 3).join('-');
      if (new Date(date) < thirtyDaysAgo) {
        delete this.activityLog.hourly[hourKey];
      }
    }

    this.saveActivityLog();
  }

  // Get ethics summary
  getEthicsSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayData = this.activityLog.daily[today] || { issues: 0, prs: 0, comments: 0, total: 0 };

    return {
      todayActivity: todayData,
      limits: this.rateLimit,
      remainingToday: {
        total: Math.max(0, this.rateLimit.totalPerDay - todayData.total),
        issues: Math.max(0, this.rateLimit.issuesPerHour - todayData.issues),
        prs: Math.max(0, this.rateLimit.prsPerHour - todayData.prs),
        comments: Math.max(0, this.rateLimit.commentsPerHour - todayData.comments)
      },
      activeRepositories: Object.keys(this.activityLog.repositories).length,
      lastActivity: this.activityLog.lastActivity
    };
  }

  // Print ethics summary
  printEthicsSummary() {
    const summary = this.getEthicsSummary();
    
    console.log('\n' + '='.repeat(60));
    console.log('🛡️ ETHICAL GUIDELINES SUMMARY');
    console.log('='.repeat(60));
    console.log('📊 TODAY\'S ACTIVITY:');
    console.log(`   Issues: ${summary.todayActivity.issues}`);
    console.log(`   Pull Requests: ${summary.todayActivity.prs}`);
    console.log(`   Comments: ${summary.todayActivity.comments}`);
    console.log(`   Total: ${summary.todayActivity.total}`);
    console.log('');
    console.log('⏰ RATE LIMITS:');
    console.log(`   Issues per hour: ${summary.limits.issuesPerHour}`);
    console.log(`   PRs per hour: ${summary.limits.prsPerHour}`);
    console.log(`   Comments per hour: ${summary.limits.commentsPerHour}`);
    console.log(`   Total per day: ${summary.limits.totalPerDay}`);
    console.log('');
    console.log('📈 REMAINING TODAY:');
    console.log(`   Total: ${summary.remainingToday.total}`);
    console.log(`   Issues: ${summary.remainingToday.issues}`);
    console.log(`   PRs: ${summary.remainingToday.prs}`);
    console.log(`   Comments: ${summary.remainingToday.comments}`);
    console.log('');
    console.log(`🏛️ Active Repositories: ${summary.activeRepositories}`);
    console.log(`⏱️ Last Activity: ${summary.lastActivity || 'None'}`);
    console.log('='.repeat(60));
  }
}

module.exports = EthicalGuidelines;
