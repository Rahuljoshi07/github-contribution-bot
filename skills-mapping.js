/**
 * Skills Mapping Configuration
 * Maps various technologies to their corresponding GitHub search patterns
 */

const skillsMapping = {
  // DevOps & Infrastructure
  'docker': {
    searchQueries: ['docker', 'dockerfile', 'containerization'],
    languages: ['dockerfile'],
    topics: ['docker', 'containers', 'containerization']
  },
  'kubernetes': {
    searchQueries: ['kubernetes', 'k8s', 'container-orchestration'],
    languages: ['yaml'],
    topics: ['kubernetes', 'k8s', 'orchestration', 'devops']
  },
  'jenkins': {
    searchQueries: ['jenkins', 'ci-cd', 'pipeline'],
    languages: ['groovy'],
    topics: ['jenkins', 'ci-cd', 'automation']
  },
  'github-actions': {
    searchQueries: ['github-actions', 'workflows', 'ci-cd'],
    languages: ['yaml'],
    topics: ['github-actions', 'ci-cd', 'automation']
  },
  'terraform': {
    searchQueries: ['terraform', 'infrastructure-as-code', 'iac'],
    languages: ['hcl'],
    topics: ['terraform', 'infrastructure', 'iac']
  },
  'ansible': {
    searchQueries: ['ansible', 'configuration-management', 'automation'],
    languages: ['yaml'],
    topics: ['ansible', 'automation', 'configuration']
  },
  'linux': {
    searchQueries: ['linux', 'unix', 'system-administration'],
    languages: ['shell', 'bash'],
    topics: ['linux', 'unix', 'system-admin']
  },
  'bash': {
    searchQueries: ['bash', 'shell-scripting', 'automation'],
    languages: ['shell', 'bash'],
    topics: ['bash', 'shell', 'scripting']
  },
  'nginx': {
    searchQueries: ['nginx', 'web-server', 'reverse-proxy'],
    languages: ['nginx'],
    topics: ['nginx', 'web-server', 'proxy']
  },

  // Programming Languages
  'javascript': {
    searchQueries: ['javascript', 'js', 'web-development'],
    languages: ['javascript'],
    topics: ['javascript', 'js', 'web', 'frontend']
  },
  'typescript': {
    searchQueries: ['typescript', 'ts', 'type-safety'],
    languages: ['typescript'],
    topics: ['typescript', 'javascript', 'type-safety']
  },
  'python': {
    searchQueries: ['python', 'data-science', 'machine-learning'],
    languages: ['python'],
    topics: ['python', 'data-science', 'ml', 'automation']
  },
  'cpp': {
    searchQueries: ['cpp', 'c++', 'systems-programming'],
    languages: ['c++'],
    topics: ['cpp', 'c++', 'systems', 'performance']
  },
  'c-sharp': {
    searchQueries: ['c#', 'csharp', 'dotnet'],
    languages: ['c#'],
    topics: ['csharp', 'dotnet', 'microsoft']
  },
  'java': {
    searchQueries: ['java', 'spring', 'enterprise'],
    languages: ['java'],
    topics: ['java', 'spring', 'enterprise']
  },
  'go': {
    searchQueries: ['go', 'golang', 'concurrency'],
    languages: ['go'],
    topics: ['go', 'golang', 'concurrency']
  },
  'rust': {
    searchQueries: ['rust', 'systems-programming', 'memory-safety'],
    languages: ['rust'],
    topics: ['rust', 'systems', 'memory-safety']
  },
  'php': {
    searchQueries: ['php', 'web-development', 'server-side'],
    languages: ['php'],
    topics: ['php', 'web', 'backend']
  },
  'ruby': {
    searchQueries: ['ruby', 'rails', 'web-development'],
    languages: ['ruby'],
    topics: ['ruby', 'rails', 'web']
  },

  // Web Technologies
  'reactjs': {
    searchQueries: ['react', 'reactjs', 'frontend'],
    languages: ['javascript', 'typescript'],
    topics: ['react', 'reactjs', 'frontend', 'ui']
  },
  'vuejs': {
    searchQueries: ['vue', 'vuejs', 'frontend'],
    languages: ['javascript', 'typescript'],
    topics: ['vue', 'vuejs', 'frontend']
  },
  'angular': {
    searchQueries: ['angular', 'frontend', 'spa'],
    languages: ['typescript'],
    topics: ['angular', 'frontend', 'spa']
  },
  'nodejs': {
    searchQueries: ['nodejs', 'node', 'backend'],
    languages: ['javascript', 'typescript'],
    topics: ['nodejs', 'node', 'backend']
  },
  'nextjs': {
    searchQueries: ['nextjs', 'next', 'react'],
    languages: ['javascript', 'typescript'],
    topics: ['nextjs', 'next', 'react', 'ssr']
  },
  'html': {
    searchQueries: ['html', 'web-development', 'frontend'],
    languages: ['html'],
    topics: ['html', 'web', 'frontend']
  },
  'css': {
    searchQueries: ['css', 'styling', 'frontend'],
    languages: ['css'],
    topics: ['css', 'styling', 'frontend']
  },
  'tailwind-css': {
    searchQueries: ['tailwind', 'tailwindcss', 'utility-first'],
    languages: ['css'],
    topics: ['tailwind', 'tailwindcss', 'css']
  },
  'bootstrap': {
    searchQueries: ['bootstrap', 'css-framework', 'responsive'],
    languages: ['css'],
    topics: ['bootstrap', 'css', 'responsive']
  },
  'material-ui': {
    searchQueries: ['material-ui', 'mui', 'react-components'],
    languages: ['javascript', 'typescript'],
    topics: ['material-ui', 'mui', 'react']
  },

  // Databases
  'mysql': {
    searchQueries: ['mysql', 'database', 'sql'],
    languages: ['sql'],
    topics: ['mysql', 'database', 'sql']
  },
  'postgresql': {
    searchQueries: ['postgresql', 'postgres', 'database'],
    languages: ['sql'],
    topics: ['postgresql', 'postgres', 'database']
  },
  'mongodb': {
    searchQueries: ['mongodb', 'nosql', 'database'],
    languages: ['javascript'],
    topics: ['mongodb', 'nosql', 'database']
  },
  'redis': {
    searchQueries: ['redis', 'cache', 'in-memory'],
    languages: ['lua'],
    topics: ['redis', 'cache', 'performance']
  },
  'sqlite': {
    searchQueries: ['sqlite', 'embedded-database', 'sql'],
    languages: ['sql'],
    topics: ['sqlite', 'database', 'embedded']
  },

  // Cloud Platforms
  'aws': {
    searchQueries: ['aws', 'amazon-web-services', 'cloud'],
    languages: ['yaml', 'json'],
    topics: ['aws', 'cloud', 'infrastructure']
  },
  'aws-ec2': {
    searchQueries: ['aws-ec2', 'ec2', 'compute'],
    languages: ['yaml'],
    topics: ['aws', 'ec2', 'compute']
  },
  'aws-s3': {
    searchQueries: ['aws-s3', 's3', 'storage'],
    languages: ['yaml'],
    topics: ['aws', 's3', 'storage']
  },
  'azure': {
    searchQueries: ['azure', 'microsoft-azure', 'cloud'],
    languages: ['yaml'],
    topics: ['azure', 'cloud', 'microsoft']
  },
  'google-cloud': {
    searchQueries: ['google-cloud', 'gcp', 'cloud'],
    languages: ['yaml'],
    topics: ['google-cloud', 'gcp', 'cloud']
  },

  // Mobile Development
  'react-native': {
    searchQueries: ['react-native', 'mobile', 'cross-platform'],
    languages: ['javascript', 'typescript'],
    topics: ['react-native', 'mobile', 'cross-platform']
  },
  'flutter': {
    searchQueries: ['flutter', 'mobile', 'dart'],
    languages: ['dart'],
    topics: ['flutter', 'mobile', 'dart']
  },
  'android': {
    searchQueries: ['android', 'mobile', 'kotlin'],
    languages: ['java', 'kotlin'],
    topics: ['android', 'mobile']
  },
  'ios': {
    searchQueries: ['ios', 'mobile', 'swift'],
    languages: ['swift', 'objective-c'],
    topics: ['ios', 'mobile', 'swift']
  },

  // Testing
  'jest': {
    searchQueries: ['jest', 'testing', 'javascript'],
    languages: ['javascript', 'typescript'],
    topics: ['jest', 'testing', 'javascript']
  },
  'cypress': {
    searchQueries: ['cypress', 'e2e-testing', 'testing'],
    languages: ['javascript', 'typescript'],
    topics: ['cypress', 'testing', 'e2e']
  },
  'selenium': {
    searchQueries: ['selenium', 'web-testing', 'automation'],
    languages: ['java', 'python'],
    topics: ['selenium', 'testing', 'automation']
  },
  'junit': {
    searchQueries: ['junit', 'java-testing', 'testing'],
    languages: ['java'],
    topics: ['junit', 'testing', 'java']
  },
  'pytest': {
    searchQueries: ['pytest', 'python-testing', 'testing'],
    languages: ['python'],
    topics: ['pytest', 'testing', 'python']
  },

  // Data Science & ML
  'machine-learning': {
    searchQueries: ['machine-learning', 'ml', 'ai'],
    languages: ['python', 'r'],
    topics: ['machine-learning', 'ml', 'ai', 'data-science']
  },
  'tensorflow': {
    searchQueries: ['tensorflow', 'deep-learning', 'neural-networks'],
    languages: ['python'],
    topics: ['tensorflow', 'deep-learning', 'ml']
  },
  'pytorch': {
    searchQueries: ['pytorch', 'deep-learning', 'neural-networks'],
    languages: ['python'],
    topics: ['pytorch', 'deep-learning', 'ml']
  },
  'pandas': {
    searchQueries: ['pandas', 'data-analysis', 'data-science'],
    languages: ['python'],
    topics: ['pandas', 'data-analysis', 'data-science']
  },
  'numpy': {
    searchQueries: ['numpy', 'scientific-computing', 'python'],
    languages: ['python'],
    topics: ['numpy', 'scientific-computing', 'python']
  },

  // Monitoring & Observability
  'prometheus': {
    searchQueries: ['prometheus', 'monitoring', 'metrics'],
    languages: ['yaml'],
    topics: ['prometheus', 'monitoring', 'observability']
  },
  'grafana': {
    searchQueries: ['grafana', 'visualization', 'monitoring'],
    languages: ['javascript'],
    topics: ['grafana', 'visualization', 'monitoring']
  },
  'elk-stack': {
    searchQueries: ['elk-stack', 'elasticsearch', 'logging'],
    languages: ['yaml'],
    topics: ['elk', 'elasticsearch', 'logging']
  },

  // Security
  'oauth': {
    searchQueries: ['oauth', 'authentication', 'security'],
    languages: ['javascript', 'python'],
    topics: ['oauth', 'authentication', 'security']
  },
  'jwt': {
    searchQueries: ['jwt', 'json-web-token', 'authentication'],
    languages: ['javascript', 'python'],
    topics: ['jwt', 'authentication', 'security']
  },

  // Methodologies
  'oop': {
    searchQueries: ['oop', 'object-oriented', 'programming'],
    languages: ['java', 'python', 'javascript'],
    topics: ['oop', 'object-oriented', 'programming']
  },
  'dsa': {
    searchQueries: ['dsa', 'data-structures', 'algorithms'],
    languages: ['python', 'java', 'cpp'],
    topics: ['dsa', 'algorithms', 'data-structures']
  },
  'microservices': {
    searchQueries: ['microservices', 'architecture', 'distributed'],
    languages: ['java', 'python', 'go'],
    topics: ['microservices', 'architecture', 'distributed']
  },
  'serverless': {
    searchQueries: ['serverless', 'lambda', 'functions'],
    languages: ['javascript', 'python'],
    topics: ['serverless', 'lambda', 'functions']
  },

  // API Technologies
  'rest': {
    searchQueries: ['rest', 'api', 'restful'],
    languages: ['javascript', 'python', 'java'],
    topics: ['rest', 'api', 'restful']
  },
  'graphql': {
    searchQueries: ['graphql', 'api', 'query-language'],
    languages: ['javascript', 'python'],
    topics: ['graphql', 'api', 'query-language']
  },
  'grpc': {
    searchQueries: ['grpc', 'rpc', 'microservices'],
    languages: ['go', 'java', 'python'],
    topics: ['grpc', 'rpc', 'microservices']
  },

  // Blockchain
  'solidity': {
    searchQueries: ['solidity', 'ethereum', 'smart-contracts'],
    languages: ['solidity'],
    topics: ['solidity', 'ethereum', 'blockchain']
  },
  'web3': {
    searchQueries: ['web3', 'blockchain', 'decentralized'],
    languages: ['javascript', 'solidity'],
    topics: ['web3', 'blockchain', 'decentralized']
  },
  'ethereum': {
    searchQueries: ['ethereum', 'blockchain', 'smart-contracts'],
    languages: ['solidity', 'javascript'],
    topics: ['ethereum', 'blockchain', 'smart-contracts']
  },

  // Game Development
  'unity': {
    searchQueries: ['unity', 'game-development', 'gamedev'],
    languages: ['c#'],
    topics: ['unity', 'game-development', 'gamedev']
  },
  'unreal-engine': {
    searchQueries: ['unreal-engine', 'game-development', 'gamedev'],
    languages: ['c++'],
    topics: ['unreal-engine', 'game-development', 'gamedev']
  },

  // Documentation
  'markdown': {
    searchQueries: ['markdown', 'documentation', 'readme'],
    languages: ['markdown'],
    topics: ['markdown', 'documentation', 'readme']
  }
};

/**
 * Get search queries for a given skill
 */
function getSearchQueriesForSkill(skill) {
  const skillData = skillsMapping[skill.toLowerCase()];
  return skillData ? skillData.searchQueries : [skill];
}

/**
 * Get programming languages associated with a skill
 */
function getLanguagesForSkill(skill) {
  const skillData = skillsMapping[skill.toLowerCase()];
  return skillData ? skillData.languages : [];
}

/**
 * Get topics associated with a skill
 */
function getTopicsForSkill(skill) {
  const skillData = skillsMapping[skill.toLowerCase()];
  return skillData ? skillData.topics : [skill];
}

/**
 * Generate GitHub search query for multiple skills
 */
function generateSearchQuery(skills, additionalCriteria = {}) {
  const {
    minStars = 10,
    maxStars = 1000,
    language = null,
    pushed = '>2023-01-01',
    sort = 'updated'
  } = additionalCriteria;

  // Get all topics for the skills
  const allTopics = skills.flatMap(skill => getTopicsForSkill(skill));
  const allLanguages = skills.flatMap(skill => getLanguagesForSkill(skill));
  
  // Build query components
  const queryParts = [];
  
  // Add star range
  queryParts.push(`stars:${minStars}..${maxStars}`);
  
  // Add push date
  if (pushed) {
    queryParts.push(`pushed:${pushed}`);
  }
  
  // Add language if specified
  if (language) {
    queryParts.push(`language:${language}`);
  } else if (allLanguages.length > 0) {
    // Use most common language from skills
    const languageCount = {};
    allLanguages.forEach(lang => {
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    });
    const mostCommonLanguage = Object.keys(languageCount).reduce((a, b) => 
      languageCount[a] > languageCount[b] ? a : b
    );
    queryParts.push(`language:${mostCommonLanguage}`);
  }
  
  // Add topics
  if (allTopics.length > 0) {
    // Use first few topics to avoid making query too long
    const topicQuery = allTopics.slice(0, 3).map(topic => `topic:${topic}`).join(' OR ');
    queryParts.push(`(${topicQuery})`);
  }
  
  return queryParts.join(' ');
}

module.exports = {
  skillsMapping,
  getSearchQueriesForSkill,
  getLanguagesForSkill,
  getTopicsForSkill,
  generateSearchQuery
};
