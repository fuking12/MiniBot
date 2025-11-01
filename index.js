const express = require("express");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

// Config with env fallback
const config = require('./config.json');
const token = process.env.GITHUB_TOKEN || config.token;
const GITHUB_TOKEN = `ghp_${token}`;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || config.GITHUB_REPO_OWNER;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || config.GITHUB_REPO_NAME;

const baseBotPath = path.join(__dirname, "base-bot");
const baseBotPackage = path.join(baseBotPath, "package.json");
const baseBotNodeModules = path.join(baseBotPath, "node_modules");
const botsPath = path.join(__dirname, "bots.json");
const commentsPath = path.join(__dirname, "comments.json");

const BOTS_JSON_URL = "https://dew-md-data.pages.dev/bots.json";
const COMMENTS_JSON_URL = "https://dew-md-data.pages.dev/comments.json";

// GitHub repo info for syncing comments.json
const GITHUB_BRANCH = "main";
const GITHUB_COMMENTS_PATH = "comments.json";

// Download bots.json if missing or empty
function downloadBotsJsonIfEmpty() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(botsPath) || fs.readFileSync(botsPath, "utf8").trim().length === 0) {
      console.log("📥 bots.json is empty or missing. Downloading from GitHub...");
      const file = fs.createWriteStream(botsPath);
      https
        .get(BOTS_JSON_URL, (res) => {
          if (res.statusCode === 200) {
            res.pipe(file);
            file.on("finish", () => {
              file.close();
              console.log("✅ bots.json downloaded from GitHub.");
              resolve();
            });
          } else {
            reject(new Error(`❌ Failed to download bots.json. HTTP ${res.statusCode}`));
          }
        })
        .on("error", (err) => {
          reject(err);
        });
    } else {
      console.log("✅ bots.json already exists and is not empty.");
      resolve();
    }
  });
}

// Download comments.json if missing or empty
function downloadCommentsJsonIfEmpty() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(commentsPath) || fs.readFileSync(commentsPath, "utf8").trim().length === 0) {
      console.log("📥 comments.json is empty or missing. Downloading from GitHub...");
      const file = fs.createWriteStream(commentsPath);
      https
        .get(COMMENTS_JSON_URL, (res) => {
          if (res.statusCode === 200) {
            res.pipe(file);
            file.on("finish", () => {
              file.close();
              console.log("✅ comments.json downloaded from GitHub.");
              resolve();
            });
          } else {
            reject(new Error(`❌ Failed to download comments.json. HTTP ${res.statusCode}`));
          }
        })
        .on("error", (err) => {
          reject(err);
        });
    } else {
      console.log("✅ comments.json already exists and is not empty.");
      resolve();
    }
  });
}

// Helper to make HTTPS requests (Promise wrapper)
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });
    req.on("error", (e) => reject(e));
    if (postData) req.write(postData);
    req.end();
  });
}

// Sync updated comments.json to GitHub by creating a commit via REST API
async function updateCommentsJsonOnGitHub(newContent) {
  if (!GITHUB_TOKEN) {
    console.warn("⚠️ No GITHUB_TOKEN set. Skipping sync to GitHub.");
    return;
  }

  try {
    // Step 1: Get current file info to get SHA
    const getOptions = {
      hostname: "api.github.com",
      path: `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_COMMENTS_PATH}`,
      method: "GET",
      headers: {
        "User-Agent": "DEW-MD-Server",
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    };

    const getRes = await httpsRequest(getOptions);
    if (getRes.statusCode !== 200) {
      throw new Error(`Failed to get file SHA from GitHub. Status: ${getRes.statusCode}`);
    }

    const fileData = JSON.parse(getRes.data);
    const sha = fileData.sha;

    // Step 2: PUT updated content
    const commitMessage = "Update comments.json via server sync";
    const contentBase64 = Buffer.from(newContent).toString("base64");

    const putData = JSON.stringify({
      message: commitMessage,
      content: contentBase64,
      sha,
      branch: GITHUB_BRANCH,
    });

    const putOptions = {
      hostname: "api.github.com",
      path: `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_COMMENTS_PATH}`,
      method: "PUT",
      headers: {
        "User-Agent": "DEW-MD-Server",
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(putData),
      },
    };

    const putRes = await httpsRequest(putOptions, putData);
    if (![200, 201].includes(putRes.statusCode)) {
      throw new Error(`Failed to sync comments.json to GitHub. Status: ${putRes.statusCode}`);
    }

    console.log("✅ comments.json synced to GitHub successfully.");
  } catch (e) {
    console.error("❌ GitHub sync error:", e.message);
  }
}

const app = express();
const PORT = process.env.PORT || 8000;  // Heroku uses $PORT

app.use(express.static(path.join(__dirname, "./frontend")));
app.use(express.json());

// NEW: /code endpoint for pairing code (links device via WhatsApp code)
app.get("/code", async (req, res) => {
  const { number } = req.query;
  if (!number || !number.startsWith('9')) {
    return res.status(400).json({ error: "Invalid number. Use +94xxxxxxxxx format (e.g., 9476xxxxxxx)" });
  }

  try {
    const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, Browsers } = require('@whiskeysockets/baileys');
    const P = require("pino");

    // Temp auth for new pairing (you can move to bots/${number} after)
    const tempAuthPath = path.join(__dirname, 'temp_auth');
    const { state, saveCreds } = await useMultiFileAuthState(tempAuthPath);

    const sock = makeWASocket({
      auth: state,
      logger: P({ level: 'silent' }),
      printQRInTerminal: false,
      browser: Browsers.whatsapp('Chrome', '6.0.0', '6.0.0')  // Multi-device browser
    });

    sock.ev.on('creds.update', saveCreds);

    // Generate pairing code (e.g., "1234 5678")
    const code = await sock.requestPairingCode(number);
    console.log(`🔗 Pairing code generated for ${number}: ${code}`);

    // Optional: Auto-clean temp after 5 min (or integrate with bots.json)
    setTimeout(() => {
      fs.rmSync(tempAuthPath, { recursive: true, force: true });
      console.log(`🧹 Cleaned temp auth for ${number}`);
    }, 300000);

    res.json({ code: code.replace(/(\d{4})/, '$1 ') });  // Format as "1234 5678"
  } catch (err) {
    console.error(`❌ Pairing error for ${number}:`, err);
    res.status(500).json({ error: "Failed to generate code. Try again." });
  }
});

// Your existing /api/deploy route unchanged
app.post("/api/deploy", (req, res) => {
  const {
    number,
    mode,
    readCmd,
    autoBlock,
    session,
    owner,
    prefix,
    autoReply,
    autoType,
    autoVoice,
    autoReact,
    statusView,
    statusReact,
    statusReply,
    antiLink,
    sendWelcome,
    antiBad,
    autoRec,
    autoBio,
    online,
    statusReactEmoji,
    AutoReactEmoji,
  } = req.body;

  const botEntry = {
    number,
    autoBlock,
    readCmd,
    session,
    owner,
    prefix,
    autoReply,
    autoVoice,
    autoReact,
    statusView,
    statusReact,
    statusReply,
    autoType,
    antiLink,
    mode,
    sendWelcome,
    antiBad,
    autoRec,
    autoBio,
    online,
    statusReactEmoji,
    AutoReactEmoji,
  };

  const bots = fs.existsSync(botsPath) ? JSON.parse(fs.readFileSync(botsPath)) : [];
  const existing = bots.findIndex((b) => b.number === number);
  if (existing >= 0) bots[existing] = botEntry;
  else bots.push(botEntry);

  fs.writeFileSync(botsPath, JSON.stringify(bots, null, 2));

  try {
    execSync(`node ${path.join(__dirname, "autoDeploy.js")}`, { stdio: "inherit" });
    res.send("✅ Bot deployed successfully!");
  } catch (e) {
    console.error("❌ Deployment failed:", e.message);
    res.status(500).send("❌ Failed to deploy.");
  }
});

const __path = process.cwd();

app.use("/deploy", (req, res) => res.sendFile(__path + "/frontend/deploy.html"));
app.use("/dashboard", (req, res) => res.sendFile(__path + "/frontend/dashboard.html"));
app.use("/login", (req, res) => res.sendFile(__path + "/frontend/login.html"));
app.get("/pair", (req, res) => 
  res.redirect("https://usual-marketa-dew-md3-348b662f.koyeb.app")
);
app.get("/api/bot-count", (req, res) => {
  const bots = fs.existsSync(botsPath) ? JSON.parse(fs.readFileSync(botsPath)) : [];
  res.json({ count: bots.length });
});
app.get("/api/bots/:number", (req, res) => {
  const bots = fs.existsSync(botsPath) ? JSON.parse(fs.readFileSync(botsPath)) : [];
  const bot = bots.find((b) => b.number === req.params.number);
  if (bot) res.json(bot);
  else res.status(404).json({ error: "Bot not found" });
});

// ✅ Comment API - GET
app.get("/api/comments", (req, res) => {
  if (!fs.existsSync(commentsPath)) {
    fs.writeFileSync(commentsPath, "[]");
  }
  try {
    const data = fs.readFileSync(commentsPath, "utf8");
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

// ✅ Comment API - POST
app.post("/api/comments", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Missing name or message" });
  }

  const newComment = {
    name,
    message,
    timestamp: new Date().toISOString(),
  };

  let comments = [];
  if (fs.existsSync(commentsPath)) {
    comments = JSON.parse(fs.readFileSync(commentsPath, "utf8"));
  }
  comments.push(newComment);

  try {
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));

    // Sync updated comments.json back to GitHub (async but awaited)
    await updateCommentsJsonOnGitHub(JSON.stringify(comments, null, 2));

    res.status(201).json({ success: true });
  } catch (e) {
    console.error("❌ Error saving or syncing comments:", e);
    res.status(500).json({ error: "Failed to save or sync comment" });
  }
});

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

async function main() {
  try {
    await downloadBotsJsonIfEmpty();
    await downloadCommentsJsonIfEmpty();
    deployMultiSessionBot();
    console.log("🚀 Running autoDeploy.js to deploy bots...");
    execSync(`node ${path.join(__dirname, "autoDeploy.js")}`, { stdio: "inherit" });
  } catch (err) {
    console.error("❌ Initialization error:", err.message);
  }
}

main();

app.listen(PORT, () => console.log(`🟢 Bot dashboard running at http://localhost:${PORT}`));
