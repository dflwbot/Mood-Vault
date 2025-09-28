const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying MoodVault contract...");
  
  const MoodVault = await hre.ethers.getContractFactory("MoodVaultDemo");
  const moodVault = await MoodVault.deploy();
  
  await moodVault.waitForDeployment();
  
  const contractAddress = await moodVault.getAddress();
  console.log("✅ MoodVault deployed to:", contractAddress);
  
  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    contractAddress: contractAddress,
    deploymentTime: new Date().toISOString(),
    network: hre.network.name,
    abi: MoodVault.interface.fragments
  };
  
  // Create frontend config
  const configContent = `const CONTRACT_ADDRESS = "${contractAddress}";
const CONTRACT_ABI = ${JSON.stringify(MoodVault.interface.fragments, null, 2)};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONTRACT_ADDRESS, CONTRACT_ABI };
}`;
  
  fs.writeFileSync('./frontend/config.js', configContent);
  
  console.log("📄 Deployment info saved to frontend/config.js");
  console.log("🎉 Deployment complete!");
  console.log("🌐 To start the frontend, run: npm start");
  console.log("📱 Then visit: http://localhost:8000");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
