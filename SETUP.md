# GitHub Contribution Bot Setup Guide

This guide will help you set up your GitHub Contribution Bot to run automatically using GitHub Actions.

## Prerequisites

- GitHub account
- GitHub Personal Access Token with appropriate scopes (repo, user)
- Repository forked or cloned to your GitHub account

## Setting Up GitHub Actions

### 1. Add Repository Secrets

Before you can use GitHub Actions, you need to add your secrets to the repository:

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** → **Actions**
4. Click on **New repository secret** and add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `BOT_GITHUB_TOKEN` | Your GitHub Personal Access Token | ghp_1234567890abcdefghijklmnopqrstuvwxyz |
| `GITHUB_USERNAME` | Your GitHub username | Rahuljoshi07 |
| `YOUR_NAME` | Your full name | Rahul Joshi |
| `YOUR_EMAIL` | Your email address | your.email@example.com |
| `SKILLS` | Comma-separated list of your skills | javascript,python,react,nodejs,html,css |

### 2. Enable GitHub Actions

GitHub Actions workflow has been set up in the `.github/workflows/contribution-bot.yml` file. This will:

- Run every hour (cron: '0 * * * *')
- Use the repository secrets you've added
- Execute the bot script

To enable it:

1. Go to the **Actions** tab in your repository
2. You should see the "GitHub Contribution Bot" workflow
3. Click on "I understand my workflows, go ahead and enable them"

### 3. Manually Trigger the Workflow

You can also trigger the workflow manually:

1. Go to the **Actions** tab
2. Select "GitHub Contribution Bot" workflow
3. Click on "Run workflow" dropdown
4. Click the "Run workflow" button

## Troubleshooting

- **Authentication Errors**: Ensure your GitHub token has the correct scopes (repo, user)
- **Rate Limit Issues**: The bot has built-in rate limiting, but GitHub also has API rate limits
- **Workflow Failures**: Check the Actions logs for details on any failures

## Customization

You can customize the bot's behavior by modifying:

- `.env` file for local testing
- GitHub Actions workflow frequency in `.github/workflows/contribution-bot.yml`
- AI analysis logic in `index.js` for more intelligent comments

## Security

- Never commit your GitHub token to the repository
- Always use repository secrets for sensitive information
- Regularly rotate your GitHub token for security best practices
