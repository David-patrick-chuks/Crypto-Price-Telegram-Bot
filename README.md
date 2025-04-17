# 🟡 Crypto Price Telegram Bot

[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/david-patrick-chuks/Crypto-Price-Telegram-Bot)](https://github.com/david-patrick-chuks/Crypto-Price-Telegram-Bot/issues)
[![Contributors](https://img.shields.io/github/contributors/david-patrick-chuks/Crypto-Price-Telegram-Bot)](https://github.com/david-patrick-chuks/Crypto-Price-Telegram-Bot/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/david-patrick-chuks/Crypto-Price-Telegram-Bot?label=forks)](https://github.com/david-patrick-chuks/Crypto-Price-Telegram-Bot/network)
[![Stars](https://img.shields.io/github/stars/david-patrick-chuks/Crypto-Price-Telegram-Bot?style=social)](https://github.com/david-patrick-chuks/Crypto-Price-Telegram-Bot)

A simple Node.js + TypeScript bot that fetches live cryptocurrency prices (BTC, ETH, SOL, BNB) every **1 minute** and sends updates to a Telegram chat using the Telegram Bot API.

![preview](https://raw.githubusercontent.com/david-patrick-chuks/Crypto-Price-Telegram-Bot/main/assets/demo.png) <!--image preview -->

---

### ✨ Features

- Fetches live crypto prices using **CoinGecko API**
- Sends formatted updates to Telegram every minute
- Shows 24h price change indicators with 🔺 or 🔻
- Powered by **Node.js**, **TypeScript**, **Axios**, and **node-cron**
- Ready to deploy on **Render** (as a background worker)

---

### 📦 Tech Stack

- Node.js + TypeScript
- Axios
- node-cron
- dotenv
- Telegram Bot API
- CoinGecko API

---

### 🚀 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/david-patrick-chuks/Crypto-Price-Telegram-Bot.git
cd Crypto-Price-Telegram-Bot
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create a `.env` file

```bash
BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id
```

#### 4. Build and Start

```bash
npm start
```

---

### 🧠 How It Works

- Every 1 minute, the bot:
  1. Fetches prices from CoinGecko
  2. Formats the data nicely
  3. Sends it to a Telegram chat via `sendMessage`

You can change the coins or update interval in the code.

---

### ⚙️ Deployment on Render

#### 🔧 `render.yaml`

```yaml
services:
  - type: worker
    name: Crypto-Price-Telegram-Bot
    runtime: node
    repo: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
    buildCommand: npm install && tsc
    startCommand: node build/bot.js
    envVars:
      - key: BOT_TOKEN
        sync: false
      - key: CHAT_ID
        sync: false
```

> After setting up the repo, go to Render → New → **Background Worker**, and use the `render.yaml` to auto-configure the app.

---

### 📁 Folder Structure

```
📦 crypto-telegram-bot/
├── src/
│   ├── interfaces/
│   │   └── prices.ts         # Contains interfaces & types
│   ├── utils/
│   │   └── format.ts         # Price formatting helper
│   ├── bot.ts
│   └── server.ts               # Main bot logic
├── .env                      # Env vars for the bot
├── package.json
├── tsconfig.json
├── Dockerfile                # Docker configuration file
└── README.md (optional)

```

---

### 🛡 License

This project is open source under the **MIT License**.

---

### 🙌 Contributing

Pull requests are welcome! If you'd like to suggest changes or add features, feel free to fork the repo and submit a PR.

---

### 👨‍💻 Author

**David Patrick (BugHunter.dev)** – [@david-patrick-chuks](https://github.com/david-patrick-chuks)  
✨ Built with love 🌸.
