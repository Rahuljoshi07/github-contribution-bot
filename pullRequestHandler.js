const axios = require('axios');

// Function to create a pull request
async function createPullRequest(repo, title, body, headBranch, baseBranch = 'main') {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls`;
  
  const pullRequestData = {
    title: title,
    body: body,
    head: headBranch,
    base: baseBranch
  };
  
  try {
    const response = await axios.post(url, pullRequestData);
    return response.data;
  } catch (error) {
    console.error('Error creating pull request:', error.response?.data || error.message);
    throw error;
  }
}

// Function to fork a repository
async function forkRepository(repo, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/forks`;
  
  try {
    const response = await axios.post(url, {}, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error forking repository:', error.response?.data || error.message);
    throw error;
  }
}

// Function to create a branch
async function createBranch(repo, branchName, baseSha, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/refs`;
  
  const branchData = {
    ref: `refs/heads/${branchName}`,
    sha: baseSha
  };
  
  try {
    const response = await axios.post(url, branchData, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating branch:', error.response?.data || error.message);
    throw error;
  }
}

// Function to commit changes to a file
async function commitFileChanges(repo, filePath, content, commitMessage, branchName, githubToken) {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${filePath}`;
  
  // First, get the current file to get its SHA
  let currentFileSha = null;
  try {
    const currentFile = await axios.get(url, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    currentFileSha = currentFile.data.sha;
  } catch (error) {
    // File doesn't exist, that's okay for new files
  }
  
  const commitData = {
    message: commitMessage,
    content: Buffer.from(content).toString('base64'),
    branch: branchName
  };
  
  if (currentFileSha) {
    commitData.sha = currentFileSha;
  }
  
  try {
    const response = await axios.put(url, commitData, {
      headers: { 'Authorization': `token ${githubToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error committing file changes:', error.response?.data || error.message);
    throw error;
  }
}

// Function to generate code improvements using AI
async function generateCodeImprovement(codeSnippet, language) {
  // Simulate AI-generated code improvement
  const improvements = {
    'javascript': {
      original: codeSnippet,
      improved: codeSnippet.replace('var ', 'const ').replace('function', 'const myFunction = '),
      explanation: 'Replaced var with const and converted to arrow function for better performance'
    },
    'python': {
      original: codeSnippet,
      improved: codeSnippet.replace('print(', 'logger.info('),
      explanation: 'Replaced print statements with proper logging'
    },
    'default': {
      original: codeSnippet,
      improved: codeSnippet + '\n// Added comment for better documentation',
      explanation: 'Added documentation comments for better code readability'
    }
  };
  
  return improvements[language] || improvements['default'];
}

// Main function to create automated pull request
async function createAutomatedPR(repo, config) {
  try {
    console.log(`Creating automated PR for ${repo.full_name}`);
    
    // 1. Fork the repository
    const forkedRepo = await forkRepository(repo, config.githubToken);
    console.log(`Forked repository: ${forkedRepo.full_name}`);
    
    // 2. Create a new branch
    const branchName = `improvement-${Date.now()}`;
    await createBranch(forkedRepo, branchName, repo.default_branch, config.githubToken);
    console.log(`Created branch: ${branchName}`);
    
    // 3. Generate code improvement (simulated)
    const improvement = await generateCodeImprovement('var x = 5;', 'javascript');
    
    // 4. Commit the improvement
    await commitFileChanges(
      forkedRepo,
      'improvement.js',
      improvement.improved,
      `Improve code quality: ${improvement.explanation}`,
      branchName,
      config.githubToken
    );
    
    // 5. Create pull request
    const pr = await createPullRequest(
      repo,
      `Code Quality Improvement by ${config.name}`,
      `## Code Quality Improvement\n\n${improvement.explanation}\n\n**Changes:**\n- Improved code structure\n- Enhanced readability\n- Better performance\n\n**Submitted by:** ${config.name}`,
      `${config.username}:${branchName}`,
      repo.default_branch
    );
    
    console.log(`Created pull request: ${pr.html_url}`);
    return pr;
    
  } catch (error) {
    console.error('Error creating automated PR:', error);
    throw error;
  }
}

module.exports = {
  createPullRequest,
  forkRepository,
  createBranch,
  commitFileChanges,
  generateCodeImprovement,
  createAutomatedPR
};
