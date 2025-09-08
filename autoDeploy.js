const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');
const config = require('./config.json');

const token = config.token;
const GITHUB_TOKEN = `ghp_${token}`;
const GITHUB_USERNAME = config.GITHUB_REPO_OWNER;
const REPO_NAME = config.GITHUB_REPO_NAME;
const FILE_PATH = 'bots.json';
const BRANCH = 'main';

const botsFile = 'bots.json';
const cacheFile = 'bots.cache.json';

const currentBots = JSON.parse(fs.readFileSync(botsFile, 'utf-8'));
const previousBots = fs.existsSync(cacheFile)
  ? JSON.parse(fs.readFileSync(cacheFile, 'utf-8'))
  : [];

const changedBots = [];

// Detect changed or new bots
function botChanged(newBot, oldBot) {
  return !oldBot || JSON.stringify(newBot) !== JSON.stringify(oldBot);
}

for (const bot of currentBots) {
  const oldBot = previousBots.find(b => b.number === bot.number);
  if (botChanged(bot, oldBot)) {
    changedBots.push(bot);
  }
}

// === ✅ Main Bot Folder Logic Here ===
for (const bot of changedBots) {
  const botFolder = `bots/${bot.number}`;
  fs.mkdirSync(botFolder, { recursive: true });
  // Create folder if not exists
  const oldBot = previousBots.find(b => b.number === bot.number);

  const sessionChanged = !oldBot || bot.session !== oldBot.session;

  if (sessionChanged) {
    if (fs.existsSync(botFolder)) {
      fs.rmSync(botFolder, { recursive: true, force: true });
      console.log(`♻️ Session changed — cleaned bot folder: ${bot.number}`);
    }
    fs.mkdirSync(botFolder, { recursive: true });
  } else {
    if (!fs.existsSync(botFolder)) {
      fs.mkdirSync(botFolder, { recursive: true });
      console.log(`📁 Created bot folder (new): ${bot.number}`);
    } else {
      console.log(`✅ No session change for bot: ${bot.number}`);
    }
  }
}

// Save updated cache
fs.writeFileSync(cacheFile, JSON.stringify(currentBots, null, 2));
console.log(`✅ Finished processing ${changedBots.length} bot(s).`);

// === GitHub Upload Section ===
const uploadToGitHub = async () => {
  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;
    const content = fs.readFileSync(botsFile, 'utf8');
    const encoded = Buffer.from(content).toString('base64');

    // Get current file sha
    const { data: currentFile } = await axios.get(fileUrl, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    // Upload with commit message
    await axios.put(fileUrl, {
      message: "🔄 Auto-sync bots.json after deployment",
      content: encoded,
      sha: currentFile.sha,
      branch: BRANCH
    }, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    console.log("✅ bots.json pushed to GitHub.");
  } catch (err) {
    console.error("❌ Failed to push bots.json to GitHub:", err.response?.data || err.message);
  }
};

function deployMultiSessionBot() {
  try {
    // Restart PM2 process for multi-session bot
    try {
      execSync('pm2 delete multi-session-bot', { stdio: 'inherit' });
    } catch {
      console.log('ℹ️ multi-session-bot not running. Starting new.');
    }

    console.log('🚀 Starting multi-session bot with PM2...');
    execSync('pm2 start bot.js --name multi-session-bot', { stdio: 'inherit' });

  } catch (err) {
    console.error('❌ Failed to deploy multi-session bot:', err);
  }
}

if (changedBots.length > 0) {
  // restart multi-session bot only if needed
  deployMultiSessionBot();
}

function main() {
  deployMultiSessionBot();
  uploadToGitHub();
}

main();
