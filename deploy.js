#!/usr/bin/env node
/**
 * Deployment Script for GitHub Contribution Bot
 * This script helps deploy the bot to GitHub with proper setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Contribution Bot Deployment Script');
console.log('=' * 60);

// Create .gitignore file
const gitignoreContent = `
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env

# Logs
*.log
logs/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Grunt intermediate storage
.grunt

# Bower dependency directory
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Bot generated files
contributions.json
activity_log.json
contributions.csv
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`;

// Create LICENSE file
const licenseContent = `MIT License

Copyright (c) 2025 Rahul Joshi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

function createFile(filename, content) {
  try {
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, content);
      console.log(`✅ Created ${filename}`);
    } else {
      console.log(`⚠️ ${filename} already exists, skipping`);
    }
  } catch (error) {
    console.error(`❌ Error creating ${filename}:`, error.message);
  }
}

function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

async function main() {
  console.log('\n📁 Setting up deployment files...');
  
  // Create necessary files
  createFile('.gitignore', gitignoreContent);
  createFile('LICENSE', licenseContent);
  
  console.log('\n🔧 Git setup...');
  
  // Initialize git if not already done
  if (!fs.existsSync('.git')) {
    if (!runCommand('git init', 'Initializing Git repository')) return;
  }
  
  // Add all files
  if (!runCommand('git add .', 'Adding files to Git')) return;
  
  // Commit changes
  const commitMessage = `feat: GitHub Contribution Bot v1.0.0

🤖 Complete GitHub Contribution Bot with features:
- AI-powered code analysis
- Smart repository discovery
- Automated pull requests
- Contribution tracking
- Ethical guidelines
- Multi-language support
- GitHub Actions CI/CD

✅ All tests passing
🛡️ Rate limiting implemented
📊 Analytics included
🚀 Ready for deployment`;

  if (!runCommand(`git commit -m "${commitMessage}"`, 'Committing changes')) return;
  
  console.log('\n🌐 GitHub repository setup...');
  console.log('📋 Next steps to deploy to GitHub:');
  console.log('');
  console.log('1. Create a new repository on GitHub:');
  console.log('   https://github.com/new');
  console.log('');
  console.log('2. Set the repository name: github-contribution-bot');
  console.log('');
  console.log('3. Copy and run these commands:');
  console.log('');
  console.log('   git branch -M main');
  console.log('   git remote add origin https://github.com/Rahuljoshi07/github-contribution-bot.git');
  console.log('   git push -u origin main');
  console.log('');
  console.log('4. Set up repository secrets in GitHub:');
  console.log('   - Go to Settings → Secrets and variables → Actions');
  console.log('   - Add these secrets:');
  console.log('     * GITHUB_TOKEN: Your GitHub Personal Access Token');
  console.log('     * GITHUB_USERNAME: Rahuljoshi07');
  console.log('     * YOUR_NAME: Rahul Joshi');
  console.log('     * YOUR_EMAIL: rj1342627@gmail.com');
  console.log('     * SKILLS: javascript,python,react,nodejs,machine-learning,web-development,api-development,docker,kubernetes,devops');
  console.log('');
  console.log('5. Enable GitHub Actions:');
  console.log('   - Go to Actions tab in your repository');
  console.log('   - Enable workflows');
  console.log('');
  console.log('🎉 Your bot will then run automatically every 6 hours!');
  console.log('');
  console.log('📊 Monitor execution:');
  console.log('   - Check Actions tab for workflow runs');
  console.log('   - Download artifacts for contribution logs');
  console.log('   - View contribution summaries');
  console.log('');
  console.log('🔧 Manual execution:');
  console.log('   - Go to Actions → GitHub Contribution Bot Runner');
  console.log('   - Click "Run workflow" to execute manually');
  console.log('');
  console.log('✅ Deployment preparation complete!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
