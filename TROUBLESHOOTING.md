# MoodVault Troubleshooting Guide

## 🔧 Wallet Connection Issues

### **Problem: "Failed to connect wallet"**

#### **Solution 1: Install MetaMask**
1. Visit https://metamask.io
2. Install the browser extension
3. Create a new wallet or import existing one
4. Refresh the page and try again

#### **Solution 2: Check MetaMask Status**
1. Make sure MetaMask is unlocked
2. Check that you're on the correct network
3. Try disconnecting and reconnecting

#### **Solution 3: Browser Issues**
1. Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Try a different browser
4. Disable ad blockers temporarily

### **Problem: "Connection rejected"**
- Click "Connect" in the MetaMask popup
- If you see "Connection request already pending", wait for the popup

### **Problem: "No accounts found"**
- Unlock MetaMask
- Make sure you have at least one account
- Try switching accounts in MetaMask

## 🎮 Demo Mode

### **What is Demo Mode?**
When the smart contract isn't deployed, the app automatically switches to demo mode:
- ✅ All features work with mock data
- ✅ No blockchain interaction required
- ✅ Perfect for testing and demonstration

### **Demo Mode Features**
- **Registration**: Simulated anonymous registration
- **Mood Submission**: Mock data submission with success messages
- **Dashboard**: Shows sample statistics and charts
- **Community Insights**: Displays mock community trends

### **How to Exit Demo Mode**
1. Deploy the smart contract: `npm run deploy`
2. Update the contract address in `frontend/config.js`
3. Refresh the page

## 🚀 Deployment Issues

### **Problem: Contract deployment fails**
1. Check your `.env` file has a valid private key
2. Ensure you have testnet ETH for gas fees
3. Verify the RPC URL is correct
4. Try running `npm run compile` first

### **Problem: "Contract not found"**
1. Make sure the contract was deployed successfully
2. Check the contract address in `frontend/config.js`
3. Verify you're on the correct network

## 🎯 Common Solutions

### **Reset Everything**
```bash
# Stop the frontend server (Ctrl+C)
# Then restart:
cd frontend && python3 -m http.server 8000
```

### **Clear Browser Data**
1. Open Developer Tools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### **Check Console Errors**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Share error details for help

## 📱 Mobile Issues

### **Problem: MetaMask not working on mobile**
1. Use MetaMask mobile app
2. Enable "Connect to DApp" in settings
3. Use the in-app browser

### **Problem: Interface looks broken on mobile**
1. Check if you're using a modern browser
2. Try rotating device orientation
3. Clear browser cache

## 🔍 Debug Information

### **Check Network Connection**
- Open Developer Tools (F12)
- Go to Network tab
- Look for failed requests (red entries)

### **Check Console Logs**
- Open Developer Tools (F12)
- Go to Console tab
- Look for error messages or warnings

### **Verify MetaMask Connection**
- Check if `window.ethereum` is available
- Look for MetaMask popup requests
- Verify account permissions

## 🆘 Still Having Issues?

### **Quick Fixes to Try**
1. **Refresh the page** (most common fix)
2. **Restart MetaMask** (close and reopen)
3. **Try incognito/private mode**
4. **Check internet connection**
5. **Update browser to latest version**

### **Get Help**
- Check the browser console for specific error messages
- Share the error details for targeted assistance
- Try the demo mode if wallet connection fails

## ✅ Success Indicators

### **Wallet Connected Successfully**
- You see your wallet address in the top right
- "Connect Wallet" button is replaced with "Disconnect"
- You can proceed to registration

### **Demo Mode Active**
- You see "🎮 Demo Mode - Contract not deployed" indicator
- All features work with mock data
- No blockchain interaction required

### **Everything Working**
- You can register anonymously
- You can submit mood data
- You see your dashboard with statistics
- You can view community insights

---

**Remember**: Demo mode is perfect for testing and demonstration. You don't need a deployed contract to see all the features in action!
