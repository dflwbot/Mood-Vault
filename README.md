# 🌟 MoodVault - Anonymous Mental Health Economy dApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue.svg)](https://soliditylang.org/)
[![FHEVM](https://img.shields.io/badge/FHEVM-Compatible-green.svg)](https://fhevm.org/)

## 🎯 Project Overview
MoodVault is the world's first anonymous mental health data economy powered by blockchain technology. Users submit encrypted daily mood data to earn tokens while contributing to mental health research - all while maintaining complete privacy.

## ✨ Features

- 🔐 **Anonymous Registration** - No personal data required
- 📊 **6-Metric Mood Tracking** - Comprehensive mental health monitoring
- 💰 **Token Rewards** - Earn tokens for consistent participation
- 📈 **Personal Dashboard** - View your mood trends and statistics
- 🌍 **Community Insights** - Anonymous aggregate mental health data
- 📱 **Mobile Responsive** - Works on all devices
- 🎮 **Demo Mode** - Works without deployed contract

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MetaMask wallet (optional - demo mode available)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/moodvault-dapp.git
cd moodvault-dapp

# Install dependencies
npm install
```

### Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration (optional for demo)
# PRIVATE_KEY=your_private_key_here
# FHEVM_RPC_URL=https://devnet.zama.ai
```

### Run the Demo
```bash
# Start the frontend server
npm start

# Open your browser to http://localhost:8000
```

### Deploy Contract (Optional)
```bash
# Compile contracts
npm run compile

# Deploy to testnet
npm run deploy
```

## 🎮 Demo Mode

The application works perfectly in demo mode without any blockchain setup:
- No MetaMask required
- No contract deployment needed
- All features functional with mock data
- Perfect for testing and demonstration

## 🎯 What Makes This Special

### 🔐 True Privacy
- Individual mood data is encrypted using FHEVM
- Even the contract cannot decrypt personal data
- Community insights generated without privacy loss

### 💰 Token Economics
- Base reward: 10 tokens per submission
- Streak bonuses: 2x multiplier per consecutive day
- Weekly bonus: 50 tokens for 7-day streaks
- Monthly bonus: 200 tokens for 30-day streaks

### 📊 Community Value
- Anonymous aggregate mental health insights
- Research-grade data without privacy concerns
- Real-time community wellbeing trends

## 🏆 Builder Track Submission

This dApp demonstrates the unique capabilities of Zama's FHEVM by solving a real-world problem: collecting sensitive mental health data for research while maintaining complete user privacy.

## 📁 Project Structure
```
moodvault-dapp/
├── contracts/
│   ├── MoodVault.sol           # Main FHEVM smart contract
│   └── deploy.js               # Deployment script
├── frontend/
│   ├── index.html              # Main application
│   ├── app.js                  # Application logic
│   ├── styles.css              # Styling
│   └── config.js               # Contract configuration
├── package.json                # Dependencies
├── hardhat.config.js           # Hardhat configuration
├── README.md                   # This file
└── env.example                 # Environment variables template
```
