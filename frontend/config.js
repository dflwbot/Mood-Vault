// Demo configuration for MoodVault
// In production, this would be generated during deployment
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint8", "name": "overallMood", "type": "uint8"},
      {"internalType": "uint8", "name": "anxiety", "type": "uint8"},
      {"internalType": "uint8", "name": "energy", "type": "uint8"},
      {"internalType": "uint8", "name": "sleep", "type": "uint8"},
      {"internalType": "uint8", "name": "social", "type": "uint8"},
      {"internalType": "uint8", "name": "stress", "type": "uint8"}
    ],
    "name": "submitMoodData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserProfile",
    "outputs": [
      {"internalType": "bool", "name": "isRegistered", "type": "bool"},
      {"internalType": "uint256", "name": "lastSubmissionTime", "type": "uint256"},
      {"internalType": "uint16", "name": "streakCount", "type": "uint16"},
      {"internalType": "uint32", "name": "totalSubmissions", "type": "uint32"},
      {"internalType": "uint32", "name": "tokensEarned", "type": "uint32"},
      {"internalType": "uint256", "name": "registrationTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "day", "type": "uint256"}],
    "name": "getCommunityTrends",
    "outputs": [
      {"internalType": "uint32", "name": "totalSubmissions", "type": "uint32"},
      {"internalType": "uint16", "name": "averageMood", "type": "uint16"},
      {"internalType": "uint16", "name": "averageAnxiety", "type": "uint16"},
      {"internalType": "uint16", "name": "averageSleep", "type": "uint16"},
      {"internalType": "uint256", "name": "lastUpdateTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONTRACT_ADDRESS, CONTRACT_ABI };
}
