# MoodVault Technical Specifications

## 🏗️ Architecture Overview

MoodVault is built on a privacy-first architecture using Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine) to enable encrypted computation on sensitive mental health data.

## 🔧 Smart Contract Details

### Contract: MoodVault.sol
- **Solidity Version**: 0.8.19
- **FHEVM Integration**: Full TFHE library usage
- **Gas Optimization**: Enabled with 200 runs

### Key Features
- **Encrypted Data Storage**: All mood data encrypted using FHEVM
- **Anonymous User Profiles**: No personal data stored
- **Token Economics**: Reward system for data contribution
- **Community Metrics**: Privacy-preserving aggregate analytics
- **Research Access Control**: Controlled access for researchers

### Data Structures
```solidity
struct UserProfile {
    bool isRegistered;
    uint256 lastSubmissionTime;
    uint16 streakCount;
    uint32 totalSubmissions;
    uint32 tokensEarned;
    euint8 encryptedReputationScore;
    uint256 registrationTime;
}

struct MoodData {
    euint8 overallMood;      // 1-10 scale
    euint8 anxietyLevel;     // 1-10 scale
    euint8 energyLevel;      // 1-10 scale
    euint8 sleepQuality;     // 1-10 scale
    euint8 socialConnection; // 1-10 scale
    euint8 stressLevel;      // 1-10 scale
    uint256 timestamp;
    bool isValid;
}
```

## 💰 Token Economics

### Reward Structure
- **Base Reward**: 10 tokens per submission
- **Streak Multiplier**: 2x tokens per consecutive day
- **Weekly Bonus**: 50 tokens for 7-day streaks
- **Monthly Bonus**: 200 tokens for 30-day streaks
- **Loyalty Bonus**: 50 tokens for 100+ total submissions

### Example Calculations
- Day 1: 10 tokens
- Day 7: 10 + 50 + (7 × 2) = 74 tokens
- Day 30: 10 + 50 + 200 + (30 × 2) = 320 tokens

## 🔐 Privacy Implementation

### FHEVM Features Used
- **TFHE.asEuint8()**: Convert encrypted data to encrypted uint8
- **TFHE.add()**: Encrypted addition operations
- **TFHE.mul()**: Encrypted multiplication operations
- **TFHE.div()**: Encrypted division operations
- **TFHE.reencrypt()**: Re-encrypt data for user access
- **TFHE.decrypt()**: Decrypt aggregate data (research only)

### Privacy Guarantees
- Individual mood data never decrypted on-chain
- Community metrics computed without revealing personal data
- Users can only decrypt their own data
- Researchers get access to aggregated, anonymized data only

## 🌐 Frontend Architecture

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No framework dependencies
- **Ethers.js**: Web3 integration
- **Chart.js**: Data visualization

### Key Components
- **Wallet Integration**: MetaMask connection
- **Mood Tracker**: Interactive sliders for data input
- **Dashboard**: Personal analytics and trends
- **Community Insights**: Anonymous aggregate data
- **Responsive Design**: Mobile-first approach

## 📊 Data Flow

### User Journey
1. **Connect Wallet**: MetaMask integration
2. **Register**: Anonymous account creation
3. **Submit Mood**: Encrypted data submission
4. **Earn Tokens**: Automatic reward calculation
5. **View Dashboard**: Personal analytics (decrypted locally)
6. **Community Insights**: Anonymous aggregate trends

### Data Encryption Flow
1. User inputs mood data (1-10 scale)
2. Frontend simulates encryption (demo purposes)
3. Encrypted data sent to smart contract
4. Contract stores encrypted data using FHEVM
5. Community metrics computed on encrypted data
6. Users can decrypt their own data locally

## 🚀 Deployment

### Network Configuration
- **Network**: FHEVM Testnet
- **Chain ID**: 8009
- **RPC URL**: https://devnet.zama.ai
- **Currency**: ETH

### Deployment Process
1. Compile smart contracts
2. Deploy to FHEVM testnet
3. Generate frontend configuration
4. Start local web server
5. Access demo at localhost:8000

## 🔍 Security Considerations

### Smart Contract Security
- **Access Control**: Role-based permissions
- **Pause Functionality**: Emergency stop capability
- **Input Validation**: Range checks for mood data
- **Reentrancy Protection**: Secure state updates

### Privacy Security
- **Encryption**: All sensitive data encrypted
- **Access Control**: Research access requires permission
- **Data Isolation**: User data completely isolated
- **Audit Trail**: All actions logged as events

## 📈 Scalability

### Performance Optimizations
- **Gas Optimization**: Solidity optimizer enabled
- **Efficient Storage**: Packed structs where possible
- **Batch Operations**: Community metrics updated efficiently
- **Caching**: Frontend caches user data locally

### Future Enhancements
- **Layer 2 Integration**: Reduce gas costs
- **Advanced Analytics**: Machine learning on encrypted data
- **Mobile App**: Native mobile application
- **API Integration**: Third-party data sources

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Individual function testing
- **Integration Tests**: End-to-end workflow testing
- **Privacy Tests**: Encryption/decryption verification
- **UI Tests**: Frontend functionality testing

### Demo Data
- **Mock Mood Data**: Sample trends for demonstration
- **Simulated Community**: Realistic community metrics
- **Token Calculations**: Reward system validation
- **Chart Visualizations**: Data presentation testing

## 📚 Documentation

### User Documentation
- **Setup Guide**: Step-by-step installation
- **User Manual**: How to use the application
- **FAQ**: Common questions and answers
- **Troubleshooting**: Problem resolution guide

### Developer Documentation
- **API Reference**: Smart contract function documentation
- **Architecture Guide**: System design overview
- **Deployment Guide**: Production deployment instructions
- **Contributing Guide**: How to contribute to the project
