#!/usr/bin/env node

/**
 * GitHub Contribution Dashboard Updater
 * 
 * This script updates your GitHub profile README with the latest contribution statistics
 * from your GitHub Contribution Bot activities.
 */

const ContributionTracker = require('./contributionTracker.js');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting GitHub Contribution Dashboard Update...\n');

async function updateDashboard() {
  try {
    const username = 'Rahuljoshi07'; // Your GitHub username
    const tracker = new ContributionTracker(username);
    
    // Check if contributions data exists
    const contributionsFile = path.join(__dirname, 'contributions.json');
    if (!fs.existsSync(contributionsFile)) {
      console.log('⚠️ No contributions data found. Run the bot first to generate data.');
      return;
    }
    
    console.log('📊 Loading contribution data...');
    const report = tracker.generateReport();
    
    console.log(`📈 Found ${report.summary.totalContributions} total contributions`);
    console.log(`   Issues: ${report.summary.totalIssues}`);
    console.log(`   Pull Requests: ${report.summary.totalPRs}`);
    console.log(`   Comments: ${report.summary.totalComments}`);
    console.log(`   Success Rate: ${report.summary.successRate}\n`);
    
    // Update the profile README
    console.log('📝 Updating profile README...');
    tracker.updateProfileReadme();
    
    // Print summary
    console.log('\n📊 Dashboard Summary:');
    tracker.printSummary();
    
    // Export data
    tracker.exportToCSV();
    console.log('\n💾 Data exported to CSV file');
    
    console.log('\n✅ Dashboard update completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Copy the updated README.md content to your GitHub profile repository');
    console.log('   2. Commit and push the changes');
    console.log('   3. Your dashboard will be visible on your GitHub profile!');
    
  } catch (error) {
    console.error('❌ Dashboard update failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Check for GitHub API rate limits
function checkGitHubStats() {
  console.log('\n🔍 Checking GitHub API status...');
  console.log('GitHub Stats widgets should load automatically from:');
  console.log('   - https://github-readme-stats.vercel.app/');
  console.log('   - If widgets are not loading, try refreshing your GitHub profile');
  console.log('   - Make sure your repositories are public for stats to show\n');
}

// Main execution
async function main() {
  await updateDashboard();
  checkGitHubStats();
  
  console.log('🎯 Dashboard update process complete!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updateDashboard, checkGitHubStats };
