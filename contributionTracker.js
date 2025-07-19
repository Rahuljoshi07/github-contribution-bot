const fs = require('fs');
const path = require('path');

// Contribution tracking class
class ContributionTracker {
  constructor(username) {
    this.username = username;
    this.dataFile = path.join(__dirname, 'contributions.json');
    this.contributions = this.loadContributions();
  }

  // Load contributions from file
  loadContributions() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading contributions:', error);
    }
    return {
      issues: [],
      pullRequests: [],
      comments: [],
      stats: {
        totalIssues: 0,
        totalPRs: 0,
        totalComments: 0,
        acceptedPRs: 0,
        closedIssues: 0,
        successRate: 0
      }
    };
  }

  // Push contributions to GitHub profile repo
  pushContributionsToProfileRepo() {
    console.log('🚀 Pushing contributions to the GitHub profile repository...');
    try {
      const exec = require('child_process').exec;
      exec(`git config user.email "${this.username}@users.noreply.github.com"`);
      exec(`git config user.name "GitHub Contribution Bot"`);
      exec('git add contributions.json');
      exec('git commit -m "Auto-update contributions"');
      exec('git push origin main');
      console.log('✅ Contributions pushed successfully!');
      
      // Trigger dashboard update
      this.triggerDashboardUpdate();
    } catch (error) {
      console.error('❌ Failed to push contributions:', error.message);
    }
  }

  // Trigger dashboard update via repository dispatch
  async triggerDashboardUpdate() {
    try {
      const https = require('https');
      const token = process.env.GITHUB_TOKEN;
      
      if (!token) {
        console.log('⚠️ No GitHub token found, skipping dashboard update trigger');
        return;
      }

      const data = JSON.stringify({
        event_type: 'update-dashboard',
        client_payload: {
          timestamp: new Date().toISOString(),
          trigger: 'bot-contribution'
        }
      });

      const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/repos/${this.username}/${this.username}/dispatches`,
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'contribution-bot',
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        if (res.statusCode === 204) {
          console.log('✅ Dashboard update triggered successfully!');
        } else {
          console.log(`⚠️ Dashboard update trigger response: ${res.statusCode}`);
        }
      });

      req.on('error', (error) => {
        console.error('❌ Failed to trigger dashboard update:', error.message);
      });

      req.write(data);
      req.end();
      
    } catch (error) {
      console.error('❌ Error triggering dashboard update:', error.message);
    }
  }

  // Save contributions to file
  saveContributions() {
    try {
      fs.writeFileSync(this.dataFile, JSON.stringify(this.contributions, null, 2));
      this.pushContributionsToProfileRepo();
    } catch (error) {
      console.error('Error saving contributions:', error);
    }
  }

  // Track a new issue
  trackIssue(repo, issueData) {
    const issue = {
      id: issueData.id,
      title: issueData.title,
      repository: repo.full_name,
      url: issueData.html_url,
      createdAt: new Date().toISOString(),
      status: 'open',
      labels: issueData.labels || [],
      type: 'issue'
    };
    
    this.contributions.issues.push(issue);
    this.contributions.stats.totalIssues++;
    this.saveContributions();
    
    console.log(`✅ Tracked new issue: ${issue.title}`);
    return issue;
  }

  // Track a new pull request
  trackPullRequest(repo, prData) {
    const pr = {
      id: prData.id,
      title: prData.title,
      repository: repo.full_name,
      url: prData.html_url,
      createdAt: new Date().toISOString(),
      status: 'open',
      type: 'pullRequest',
      additions: prData.additions || 0,
      deletions: prData.deletions || 0
    };
    
    this.contributions.pullRequests.push(pr);
    this.contributions.stats.totalPRs++;
    this.saveContributions();
    
    console.log(`✅ Tracked new pull request: ${pr.title}`);
    return pr;
  }

  // Track a new comment
  trackComment(repo, commentData) {
    const comment = {
      id: commentData.id,
      repository: repo.full_name,
      issueTitle: commentData.issueTitle,
      url: commentData.html_url,
      createdAt: new Date().toISOString(),
      type: 'comment',
      content: commentData.body.substring(0, 100) + '...'
    };
    
    this.contributions.comments.push(comment);
    this.contributions.stats.totalComments++;
    this.saveContributions();
    
    console.log(`✅ Tracked new comment on: ${comment.issueTitle}`);
    return comment;
  }

  // Update contribution status
  updateContributionStatus(id, type, status) {
    let contribution = null;
    
    switch (type) {
      case 'issue':
        contribution = this.contributions.issues.find(i => i.id === id);
        if (contribution) {
          contribution.status = status;
          if (status === 'closed') {
            this.contributions.stats.closedIssues++;
          }
        }
        break;
      case 'pullRequest':
        contribution = this.contributions.pullRequests.find(pr => pr.id === id);
        if (contribution) {
          contribution.status = status;
          if (status === 'merged') {
            this.contributions.stats.acceptedPRs++;
          }
        }
        break;
    }
    
    if (contribution) {
      this.updateSuccessRate();
      this.saveContributions();
      console.log(`✅ Updated ${type} ${id} status to: ${status}`);
    }
  }

  // Update success rate
  updateSuccessRate() {
    const totalContributions = this.contributions.stats.totalIssues + this.contributions.stats.totalPRs;
    const successfulContributions = this.contributions.stats.closedIssues + this.contributions.stats.acceptedPRs;
    
    if (totalContributions > 0) {
      this.contributions.stats.successRate = ((successfulContributions / totalContributions) * 100).toFixed(2);
    }
  }

  // Generate contribution report
  generateReport() {
    const stats = this.contributions.stats;
    const recentContributions = this.getRecentContributions(30); // Last 30 days
    
    const report = {
      username: this.username,
      generatedAt: new Date().toISOString(),
      summary: {
        totalContributions: stats.totalIssues + stats.totalPRs + stats.totalComments,
        totalIssues: stats.totalIssues,
        totalPRs: stats.totalPRs,
        totalComments: stats.totalComments,
        successRate: stats.successRate + '%',
        acceptedPRs: stats.acceptedPRs,
        closedIssues: stats.closedIssues
      },
      recentActivity: {
        last30Days: recentContributions.length,
        contributions: recentContributions
      },
      topRepositories: this.getTopRepositories(),
      contributionTypes: this.getContributionTypeBreakdown()
    };
    
    return report;
  }

  // Get recent contributions
  getRecentContributions(days) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const allContributions = [
      ...this.contributions.issues.map(i => ({...i, type: 'issue'})),
      ...this.contributions.pullRequests.map(pr => ({...pr, type: 'pullRequest'})),
      ...this.contributions.comments.map(c => ({...c, type: 'comment'}))
    ];
    
    return allContributions
      .filter(contrib => new Date(contrib.createdAt) >= cutoffDate)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Get top repositories by contribution count
  getTopRepositories() {
    const repoCount = {};
    
    [...this.contributions.issues, ...this.contributions.pullRequests, ...this.contributions.comments]
      .forEach(contrib => {
        repoCount[contrib.repository] = (repoCount[contrib.repository] || 0) + 1;
      });
    
    return Object.entries(repoCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([repo, count]) => ({ repository: repo, contributions: count }));
  }

  // Get contribution type breakdown
  getContributionTypeBreakdown() {
    return {
      issues: this.contributions.stats.totalIssues,
      pullRequests: this.contributions.stats.totalPRs,
      comments: this.contributions.stats.totalComments
    };
  }

  // Print contribution summary
  printSummary() {
    const report = this.generateReport();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONTRIBUTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`👤 Username: ${report.username}`);
    console.log(`📅 Generated: ${new Date(report.generatedAt).toLocaleDateString()}`);
    console.log('');
    console.log('📈 STATISTICS:');
    console.log(`   Total Contributions: ${report.summary.totalContributions}`);
    console.log(`   Issues Created: ${report.summary.totalIssues}`);
    console.log(`   Pull Requests: ${report.summary.totalPRs}`);
    console.log(`   Comments: ${report.summary.totalComments}`);
    console.log(`   Success Rate: ${report.summary.successRate}`);
    console.log('');
    console.log('🏆 TOP REPOSITORIES:');
    report.topRepositories.forEach((repo, index) => {
      console.log(`   ${index + 1}. ${repo.repository} (${repo.contributions} contributions)`);
    });
    console.log('');
    console.log('⏱️ RECENT ACTIVITY:');
    console.log(`   Last 30 days: ${report.recentActivity.last30Days} contributions`);
    console.log('='.repeat(60));
  }

  // Export contributions to CSV
  exportToCSV() {
    const csvFile = path.join(__dirname, 'contributions.csv');
    const allContributions = [
      ...this.contributions.issues.map(i => ({...i, type: 'issue'})),
      ...this.contributions.pullRequests.map(pr => ({...pr, type: 'pullRequest'})),
      ...this.contributions.comments.map(c => ({...c, type: 'comment'}))
    ];
    
    const csvHeader = 'Type,Repository,Title,URL,Created At,Status\n';
    const csvData = allContributions.map(contrib => 
      `${contrib.type},${contrib.repository},"${contrib.title || contrib.issueTitle || 'Comment'}",${contrib.url},${contrib.createdAt},${contrib.status || 'N/A'}`
    ).join('\n');
    
    fs.writeFileSync(csvFile, csvHeader + csvData);
    console.log(`✅ Contributions exported to: ${csvFile}`);
  }
}

module.exports = ContributionTracker;
