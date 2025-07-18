const axios = require('axios');

// Function to get repository statistics
async function getRepositoryStats(repo, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}`;
  
  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    
    return {
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
      lastUpdated: new Date(response.data.updated_at),
      language: response.data.language,
      hasIssues: response.data.has_issues,
      size: response.data.size
    };
  } catch (error) {
    console.error('Error getting repository stats:', error.response?.data || error.message);
    return null;
  }
}

// Function to check maintainer responsiveness
async function checkMaintainerResponsiveness(repo, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues?state=closed&per_page=10`;
  
  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    
    const closedIssues = response.data;
    if (closedIssues.length === 0) return { responsive: false, avgResponseTime: 0 };
    
    let totalResponseTime = 0;
    let respondedIssues = 0;
    
    for (const issue of closedIssues) {
      const createdAt = new Date(issue.created_at);
      const closedAt = new Date(issue.closed_at);
      const responseTime = (closedAt - createdAt) / (1000 * 60 * 60 * 24); // days
      
      totalResponseTime += responseTime;
      respondedIssues++;
    }
    
    const avgResponseTime = totalResponseTime / respondedIssues;
    
    return {
      responsive: avgResponseTime < 30, // Consider responsive if avg response < 30 days
      avgResponseTime: avgResponseTime,
      totalClosedIssues: closedIssues.length
    };
  } catch (error) {
    console.error('Error checking maintainer responsiveness:', error.response?.data || error.message);
    return { responsive: false, avgResponseTime: 0 };
  }
}

// Function to filter repositories based on criteria
function filterRepositories(repos, criteria = {}) {
  const {
    minStars = 10,
    maxStars = 50000,
    minForks = 5,
    maxIssues = 100,
    languages = [],
    maxDaysOld = 365,
    requiresIssues = true,
    requiredSkills = []
  } = criteria;
  
  return repos.filter(repo => {
    const stats = repo.stats;
    if (!stats) return false;
    
    // Check star count
    if (stats.stars < minStars || stats.stars > maxStars) return false;
    
    // Check fork count
    if (stats.forks < minForks) return false;
    
    // Check issues count
    if (stats.issues > maxIssues) return false;
    
    // Check language
    if (languages.length > 0 && !languages.includes(stats.language)) return false;
    
    // Check required skills
    if (requiredSkills.length > 0 && !requiredSkills.some(skill => repo.topics?.includes(skill) || stats.language?.toLowerCase().includes(skill))) return false;

    // Check if repo has issues enabled
    if (requiresIssues && !stats.hasIssues) return false;
    
    // Check last updated
    const daysSinceUpdate = (new Date() - stats.lastUpdated) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate > maxDaysOld) return false;
    
    return true;
  });
}

// Function to score repositories for contribution priority
function scoreRepositories(repos) {
  return repos.map(repo => {
    const stats = repo.stats;
    const responsiveness = repo.responsiveness;
    
    let score = 0;
    
    // Stars score (sweet spot around 100-1000 stars)
    if (stats.stars >= 100 && stats.stars <= 1000) score += 10;
    else if (stats.stars >= 50 && stats.stars <= 5000) score += 5;
    else score += 1;
    
    // Activity score (recently updated)
    const daysSinceUpdate = (new Date() - stats.lastUpdated) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate <= 7) score += 8;
    else if (daysSinceUpdate <= 30) score += 5;
    else if (daysSinceUpdate <= 90) score += 2;
    
    // Issues score (good number of issues for contribution)
    if (stats.issues >= 5 && stats.issues <= 20) score += 8;
    else if (stats.issues >= 1 && stats.issues <= 50) score += 5;
    else if (stats.issues > 50) score += 2;
    
    // Responsiveness score
    if (responsiveness.responsive) score += 10;
    else if (responsiveness.avgResponseTime < 60) score += 5;
    
    // Fork score (community interest)
    if (stats.forks >= 10 && stats.forks <= 100) score += 5;
    else if (stats.forks >= 5) score += 3;
    
    return {
      ...repo,
      score: score
    };
  }).sort((a, b) => b.score - a.score);
}

// Main function to get and filter repositories
async function getTargetedRepositories(searchQuery, githubToken, criteria = {}) {
  try {
    console.log('Searching for repositories...');
    
    // Search repositories
    const searchUrl = `https://api.github.com/search/repositories?q=${searchQuery}&per_page=50&sort=updated`;
    const searchResponse = await axios.get(searchUrl, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    
    const repos = searchResponse.data.items;
    console.log(`Found ${repos.length} repositories`);
    
    // Get stats for each repository
    const reposWithStats = [];
    for (const repo of repos) {
      console.log(`Analyzing ${repo.full_name}...`);
      
      const stats = await getRepositoryStats(repo, githubToken);
      const responsiveness = await checkMaintainerResponsiveness(repo, githubToken);
      
      if (stats) {
        reposWithStats.push({
          ...repo,
          stats: stats,
          responsiveness: responsiveness
        });
      }
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Filter repositories
    const filteredRepos = filterRepositories(reposWithStats, criteria);
    console.log(`Filtered to ${filteredRepos.length} repositories`);
    
    // Score and sort repositories
    const scoredRepos = scoreRepositories(filteredRepos);
    console.log('Repositories scored and sorted by contribution potential');
    
    return scoredRepos;
    
  } catch (error) {
    console.error('Error getting targeted repositories:', error);
    return [];
  }
}

// Function to get repository languages
async function getRepositoryLanguages(repo, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;
  
  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting repository languages:', error.response?.data || error.message);
    return {};
  }
}

module.exports = {
  getRepositoryStats,
  checkMaintainerResponsiveness,
  filterRepositories,
  scoreRepositories,
  getTargetedRepositories,
  getRepositoryLanguages
};
