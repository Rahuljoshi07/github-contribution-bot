#!/usr/bin/env node

/**
 * Quick GitHub Token Test
 * Run this after updating your .env file with a real token
 */

require('dotenv').config();
const https = require('https');

async function testToken() {
  const token = process.env.GITHUB_TOKEN;
  
  console.log('🔍 Testing GitHub Token...\n');
  
  if (!token || token === 'your_token_here') {
    console.log('❌ ERROR: No valid token found!');
    console.log('📝 Please update your .env file:');
    console.log('   1. Open .env file');
    console.log('   2. Replace "your_token_here" with your actual token');
    console.log('   3. Save and run this script again\n');
    return;
  }

  console.log('✅ Token found in .env file');
  console.log(`🔑 Token starts with: ${token.substring(0, 4)}...`);
  
  // Test API connection
  console.log('\n🌐 Testing GitHub API connection...');
  
  const options = {
    hostname: 'api.github.com',
    path: '/user',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'GitHub-Contribution-Bot-Test',
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
          console.log('✅ SUCCESS! GitHub API connection working!');
          console.log(`👤 Authenticated as: ${user.login}`);
          console.log(`📧 Email: ${user.email || 'Not public'}`);
          console.log(`📊 Public repos: ${user.public_repos}`);
          console.log(`👥 Followers: ${user.followers}`);
          console.log('\n🎉 Your bot is ready to run!');
          console.log('▶️  Run: node test-bot.js');
        } else {
          console.log(`❌ FAILED: GitHub API returned ${res.statusCode}`);
          console.log('🔧 Token might be invalid or lack proper scopes');
          console.log('💡 Generate a new token with these scopes:');
          console.log('   • repo (Full control)');
          console.log('   • user (Update user data)');
          console.log('   • workflow (Update workflows)');
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
}

testToken().catch(console.error);
