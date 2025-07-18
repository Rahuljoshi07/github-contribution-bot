# 🤖 GitHub Contribution Bot

An intelligent, fully automated GitHub contribution bot that finds, analyzes, and contributes to open source projects using AI-powered analysis.

## 🚀 Features

- **🧠 AI-Powered Analysis**: Uses multiple AI providers to analyze code and suggest improvements
- **🔍 Smart Repository Discovery**: Finds repositories based on your skills and interests
- **📊 Contribution Tracking**: Tracks all your contributions with detailed analytics
- **🛡️ Ethical Guidelines**: Built-in rate limiting and quality checks
- **🌍 Multi-Language Support**: Supports JavaScript, Python, Java, and more
- **🎯 Automated Pull Requests**: Creates meaningful PRs with actual code improvements
- **📈 Detailed Reporting**: Generates comprehensive contribution reports

## 📋 Prerequisites

- Node.js 16.x or higher
- GitHub Personal Access Token
- (Optional) AI API keys for enhanced analysis

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/github-contribution-bot.git
cd github-contribution-bot
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# GitHub API Configuration
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username
YOUR_NAME=Your Full Name
YOUR_EMAIL=your.email@example.com

# Skills and Domains (comma-separated)
SKILLS=javascript,python,react,nodejs,machine-learning,web-development

# AI Configuration (Optional)
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key

# Bot Configuration
MAX_REPOS_PER_SEARCH=10
MAX_ISSUES_PER_REPO=5
CONTRIBUTION_DELAY_MS=5000
```

## 🏃‍♂️ Usage

### Local Development

1. **Run tests:**
```bash
node test-bot.js
```

2. **Run the bot:**
```bash
node index.js
```

### GitHub Actions (Recommended)

The bot includes GitHub Actions workflows for automated execution:

- **Scheduled runs**: Every 6 hours automatically
- **Manual trigger**: Run on-demand with custom parameters
- **PR/Push testing**: Automatic testing on code changes

## 🔧 Configuration

### GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with these scopes:
   - `repo` (Full control of private repositories)
   - `user` (Read user profile data)
   - `workflow` (Update GitHub Action workflows)

### Skills Configuration

The bot supports a comprehensive range of technologies and skills. Add your skills to the `SKILLS` environment variable:

```env
# Example with comprehensive skills
SKILLS=docker,kubernetes,jenkins,github-actions,ci-cd,linux,bash,ansible,terraform,python,javascript,typescript,reactjs,nodejs,mysql,aws,machine-learning,oop,dsa
```

#### Supported Technology Categories:

**DevOps & Infrastructure:**
- Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD Pipelines
- Linux, Bash, Ansible, Terraform, Nginx
- AWS (EC2, S3, IAM, CloudWatch), Azure, Google Cloud
- Prometheus, Grafana, ELK Stack, Nagios

**Programming Languages:**
- JavaScript, TypeScript, Python, C++, C#, C, Java, Go, Rust, PHP, Ruby
- Shell scripting, YAML, JSON, XML

**Web Technologies:**
- HTML, CSS, ReactJS, Vue.js, Angular, Node.js
- Next.js, Express.js, Material UI, Bootstrap, Tailwind CSS
- REST APIs, GraphQL, WebSockets

**Databases:**
- MySQL, PostgreSQL, MongoDB, Redis, SQLite
- Elasticsearch, Cassandra, Oracle

**Mobile Development:**
- React Native, Flutter, Android (Java/Kotlin), iOS (Swift/Objective-C)

**Testing & Quality:**
- Jest, Mocha, Cypress, Selenium, JUnit, PyTest
- TDD, BDD, Unit Testing, Integration Testing

**Data Science & ML:**
- Machine Learning, TensorFlow, PyTorch, Pandas, NumPy
- Jupyter, R, MATLAB, Data Analysis

**Cloud & Deployment:**
- AWS, Azure, Google Cloud, Heroku, Vercel, Netlify
- Docker, Kubernetes, Serverless, Microservices

**And many more!** Check the `skills-mapping.js` file for the complete list.

## 🤖 How It Works

1. **Repository Discovery**: Searches GitHub for repositories matching your skills
2. **Quality Filtering**: Applies ethical guidelines and quality checks
3. **Issue Analysis**: Uses AI to analyze open issues and suggest improvements
4. **Contribution Generation**: Creates meaningful comments, issues, or pull requests
5. **Tracking**: Records all contributions for analytics and reporting

## 📊 Monitoring

The bot generates several monitoring files:

- `contributions.json`: Detailed contribution history
- `activity_log.json`: Rate limiting and activity logs
- `contributions.csv`: Exportable contribution data

## 🛡️ Ethical Guidelines

The bot includes built-in ethical guidelines:

- **Rate Limiting**: 
  - Max 5 issues per hour
  - Max 3 PRs per hour
  - Max 10 comments per hour
  - Max 50 actions per day

- **Quality Checks**:
  - Minimum content length requirements
  - Spam detection
  - Repository suitability validation
  - Content relevance verification

## 🚀 Deployment

### GitHub Actions (Recommended)

1. **Set up repository secrets:**
   - `GITHUB_TOKEN`: Your GitHub PAT
   - `GITHUB_USERNAME`: Your GitHub username
   - `YOUR_NAME`: Your full name
   - `YOUR_EMAIL`: Your email
   - `SKILLS`: Your comma-separated skills

2. **Enable GitHub Actions:**
   - Push to main branch
   - Actions will run automatically

## 🧪 Testing

Run comprehensive tests:

```bash
# Run all tests
node test-bot.js
```

## 📜 License

MIT License - see LICENSE file for details
