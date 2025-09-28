# MoodVault Deployment Guide

## 🚀 Quick Deployment

### Prerequisites
- Node.js v16 or higher
- MetaMask wallet installed
- FHEVM testnet access
- Git

### Step 1: Setup Environment
```bash
# Clone the repository
git clone <your-repo-url>
cd moodvault-dapp

# Install dependencies
npm install

# Setup environment variables
cp env.example .env
# Edit .env with your private key and RPC URL
```

### Step 2: Deploy Smart Contract
```bash
# Compile contracts
npm run compile

# Deploy to FHEVM testnet
npm run deploy
```

### Step 3: Start Frontend
```bash
# Start the frontend server
npm start
```

### Step 4: Access the Demo
Open your browser and visit: `http://localhost:8000`

## 🔧 Configuration

### Environment Variables (.env)
```
PRIVATE_KEY=your_private_key_here
FHEVM_RPC_URL=https://devnet.zama.ai
```

### MetaMask Setup
1. Add FHEVM testnet to MetaMask
2. Network Name: FHEVM Testnet
3. RPC URL: https://devnet.zama.ai
4. Chain ID: 8009
5. Currency Symbol: ETH

## 🎯 Demo Features

### For Users
- **Anonymous Registration**: No personal data required
- **Daily Mood Tracking**: Submit encrypted mood data
- **Token Rewards**: Earn tokens for participation
- **Personal Dashboard**: View your mood trends
- **Streak Tracking**: Build streaks for bonus rewards

### For Researchers
- **Community Insights**: Anonymous aggregate data
- **Research Access**: Controlled access to aggregated data
- **Real-time Analytics**: Live community mood trends

## 🛠️ Troubleshooting

### Common Issues

1. **"User not registered" error**
   - Make sure you've registered your wallet address
   - Check if the transaction was successful

2. **"Already submitted today" error**
   - You can only submit once per day
   - Wait until the next day or use a different wallet

3. **MetaMask connection issues**
   - Ensure MetaMask is installed and unlocked
   - Check that you're connected to FHEVM testnet
   - Refresh the page and try again

4. **Contract deployment fails**
   - Check your private key in .env
   - Ensure you have testnet ETH for gas fees
   - Verify the RPC URL is correct

### Getting Help
- Check the browser console for error messages
- Ensure all dependencies are installed
- Verify your environment configuration

## 📊 Demo Data

The demo includes sample data to showcase:
- Mock mood trends over time
- Simulated community patterns
- Token reward calculations
- Privacy-preserving analytics

## 🔐 Privacy Features

- **FHEVM Encryption**: All mood data is encrypted on-chain
- **Zero-Knowledge**: Even the contract can't decrypt individual data
- **Anonymous Analytics**: Community insights without privacy loss
- **User Control**: Only you can decrypt your personal data

## 🎉 Success!

Once deployed, you'll have a fully functional demo of the world's first anonymous mental health data economy powered by FHEVM!
