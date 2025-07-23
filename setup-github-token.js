#!/usr/bin/env node

/**
 * GitHub Personal Access Token Setup Helper
 * 
 * This script helps you set up a GitHub Personal Access Token for the contribution bot.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔐 GitHub Personal Access Token Setup Helper');
console.log('=' * 60);

async function setupGitHubToken() {
  console.log('\n📋 STEP-BY-STEP GUIDE:');
  console.log('1. 🌐 Go to: https://github.com/settings/tokens');
  console.log('2. 🔘 Click "Generate new token" → "Generate new token (classic)"');
  console.log('3. 📝 Give it a name like: "GitHub Contribution Bot"');
  console.log('4. ⏰ Set expiration: "No expiration" (or your preferred time)');
  console.log('5. ✅ Select these scopes:');
  console.log('   ✓ repo (Full control of private repositories)');
  console.log('   ✓ user (Update user data)');
  console.log('   ✓ workflow (Update GitHub Actions workflows)');
  console.log('   ✓ read:org (Read organization data)');
  console.log('6. 🔄 Click "Generate token"');
  console.log('7. 📋 Copy the token (starts with ghp_ or github_pat_)');
  console.log('\n⚠️  IMPORTANT: Save the token immediately - you won\'t see it again!');
  
  console.log('\n🔧 Once you have your token:');
  console.log('8. 📝 Paste it when prompted below');
  console.log('9. 🤖 The bot will automatically update your .env file');
  
  // Open GitHub tokens page
  console.log('\n🚀 Opening GitHub tokens page in your browser...');
  try {
    await new Promise((resolve, reject) => {
      exec('start https://github.com/settings/tokens', (error) => {
        if (error) {
          console.log('⚠️ Could not open browser automatically.');
          console.log('🌐 Please manually go to: https://github.com/settings/tokens');
        }
        resolve();
      });
    });
  } catch (error) {
    console.log('⚠️ Could not open browser automatically.');
    console.log('🌐 Please manually go to: https://github.com/settings/tokens');
  }

  console.log('\n📋 After creating your token, come back here and follow the instructions below:');
  console.log('\n💡 Manual Setup Instructions:');
  console.log('1. Open your .env file in the github-contribution-bot folder');
  console.log('2. Find the line: GITHUB_TOKEN=your_token_here');
  console.log('3. Replace "your_token_here" with your actual token');
  console.log('4. Save the file');
  console.log('5. Run the bot: node test-bot.js');
  
  // Show current .env status
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasToken = envContent.includes('GITHUB_TOKEN=') && !envContent.includes('your_token_here');
    
    console.log('\n📄 Current .env file status:');
    if (hasToken) {
      console.log('✅ GitHub token appears to be configured');
    } else {
      console.log('❌ GitHub token not configured yet');
      console.log('📝 Current token line:', envContent.split('\n').find(line => line.includes('GITHUB_TOKEN=')));
    }
  } else {
    console.log('\n❌ .env file not found!');
  }

  console.log('\n🧪 Testing Token (if configured):');
  await testGitHubToken();
}

async function testGitHubToken() {
  try {
    require('dotenv').config();
    const token = process.env.GITHUB_TOKEN;
    
    if (!token || token === 'your_token_here') {
      console.log('❌ No valid token found in .env file');
      return;
    }
    
    console.log('🔍 Testing GitHub API connection...');
    
    const https = require('https');
    const options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'GitHub-Contribution-Bot-Setup',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            const user = JSON.parse(data);
            console.log('✅ GitHub API connection successful!');
            console.log(`👤 Authenticated as: ${user.login} (${user.name})`);
            console.log(`📊 Public repos: ${user.public_repos}`);
            console.log(`👥 Followers: ${user.followers}`);
          } else {
            console.log(`❌ GitHub API connection failed: ${res.statusCode}`);
            console.log('💡 Please check your token permissions and try again');
          }
          resolve();
        });
      });

      req.on('error', (error) => {
        console.log('❌ Network error:', error.message);
        resolve();
      });

      req.end();
    });
  } catch (error) {
    console.log('❌ Error testing token:', error.message);
  }
}

// Create a sample .env file if it doesn't exist
function createSampleEnvFile() {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    const sampleEnv = `# GitHub API Configuration
# Replace 'your_token_here' with your actual GitHub Personal Access Token
GITHUB_TOKEN=your_token_here

# Your Profile Information
GITHUB_USERNAME=Rahuljoshi07
YOUR_NAME=Rahul Joshi
YOUR_EMAIL=rj1342627@gmail.com

# Skills and Domains (comma-separated)
SKILLS=javascript,python,react,nodejs,html,css,typescript,java,go,docker,kubernetes,aws,machine-learning,data-science,flask,django,express,mongodb,postgresql,mysql

# Bot Configuration
MAX_REPOS_PER_SEARCH=5
MAX_ISSUES_PER_REPO=3
CONTRIBUTION_DELAY_MS=5000
`;

    fs.writeFileSync(envPath, sampleEnv);
    console.log('📄 Created sample .env file');
  }
}

// Run setup
if (require.main === module) {
  createSampleEnvFile();
  setupGitHubToken().catch(console.error);
}
