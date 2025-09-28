// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Demo version of MoodVault for demonstration purposes
// In production, this would use actual FHEVM encryption

contract MoodVaultDemo {
    struct UserProfile {
        bool isRegistered;
        uint256 lastSubmissionTime;
        uint16 streakCount;
        uint32 totalSubmissions;
        uint32 tokensEarned;
        uint8 reputationScore; // Simplified for demo
        uint256 registrationTime;
    }
    
    struct MoodData {
        uint8 overallMood;      // 1-10 scale
        uint8 anxietyLevel;     // 1-10 scale
        uint8 energyLevel;      // 1-10 scale
        uint8 sleepQuality;     // 1-10 scale
        uint8 socialConnection; // 1-10 scale
        uint8 stressLevel;      // 1-10 scale
        uint256 timestamp;
        bool isValid;
    }
    
    struct CommunityMetrics {
        uint32 totalActiveUsers;
        uint32 totalSubmissionsToday;
        uint16 averageMoodToday;
        uint16 averageAnxietyToday;
        uint16 averageEnergyToday;
        uint16 averageSleepToday;
        uint256 lastUpdateTime;
    }
    
    mapping(address => UserProfile) public users;
    mapping(address => mapping(uint256 => MoodData)) public userMoodHistory;
    mapping(uint256 => CommunityMetrics) public dailyCommunityMetrics;
    
    mapping(address => bool) public researchAccess;
    address public researchCoordinator;
    bool public isPaused = false;
    
    uint256 public constant BASE_REWARD = 10;
    uint256 public constant STREAK_MULTIPLIER = 2;
    uint256 public constant WEEKLY_BONUS = 50;
    uint256 public constant MONTHLY_BONUS = 200;
    
    event UserRegistered(address indexed user);
    event MoodSubmitted(address indexed user, uint256 day);
    event TokensEarned(address indexed user, uint256 amount);
    event CommunityMetricsUpdated(uint256 day);
    event ResearchAccessGranted(address indexed researcher);
    
    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }
    
    modifier oncePerDay() {
        uint256 today = block.timestamp / 1 days;
        require(
            users[msg.sender].lastSubmissionTime / 1 days < today,
            "Already submitted today"
        );
        _;
    }
    
    modifier notPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }
    
    modifier onlyResearchCoordinator() {
        require(msg.sender == researchCoordinator, "Not research coordinator");
        _;
    }
    
    constructor() {
        researchCoordinator = msg.sender;
        uint256 today = block.timestamp / 1 days;
        dailyCommunityMetrics[today] = CommunityMetrics({
            totalActiveUsers: 0,
            totalSubmissionsToday: 0,
            averageMoodToday: 0,
            averageAnxietyToday: 0,
            averageEnergyToday: 0,
            averageSleepToday: 0,
            lastUpdateTime: block.timestamp
        });
    }
    
    function registerUser() external notPaused {
        require(!users[msg.sender].isRegistered, "User already registered");
        
        users[msg.sender] = UserProfile({
            isRegistered: true,
            lastSubmissionTime: 0,
            streakCount: 0,
            totalSubmissions: 0,
            tokensEarned: 0,
            reputationScore: 50, // Start with neutral reputation
            registrationTime: block.timestamp
        });
        
        emit UserRegistered(msg.sender);
    }
    
    function submitMoodData(
        uint8 overallMood,
        uint8 anxiety,
        uint8 energy,
        uint8 sleep,
        uint8 social,
        uint8 stress
    ) external onlyRegistered oncePerDay notPaused {
        require(overallMood >= 1 && overallMood <= 10, "Invalid mood value");
        require(anxiety >= 1 && anxiety <= 10, "Invalid anxiety value");
        require(energy >= 1 && energy <= 10, "Invalid energy value");
        require(sleep >= 1 && sleep <= 10, "Invalid sleep value");
        require(social >= 1 && social <= 10, "Invalid social value");
        require(stress >= 1 && stress <= 10, "Invalid stress value");
        
        uint256 today = block.timestamp / 1 days;
        
        userMoodHistory[msg.sender][today] = MoodData({
            overallMood: overallMood,
            anxietyLevel: anxiety,
            energyLevel: energy,
            sleepQuality: sleep,
            socialConnection: social,
            stressLevel: stress,
            timestamp: block.timestamp,
            isValid: true
        });
        
        UserProfile storage user = users[msg.sender];
        user.lastSubmissionTime = block.timestamp;
        user.totalSubmissions++;
        
        uint256 yesterday = today - 1;
        if (userMoodHistory[msg.sender][yesterday].isValid) {
            user.streakCount++;
        } else {
            user.streakCount = 1;
        }
        
        uint256 tokensToEarn = calculateReward(user.streakCount, user.totalSubmissions);
        user.tokensEarned += uint32(tokensToEarn);
        
        user.reputationScore = user.reputationScore + 1;
        if (user.reputationScore > 100) user.reputationScore = 100;
        
        updateCommunityMetrics(today, overallMood, anxiety, energy, sleep);
        
        emit MoodSubmitted(msg.sender, today);
        emit TokensEarned(msg.sender, tokensToEarn);
    }
    
    function calculateReward(uint16 streakCount, uint32 totalSubmissions) internal pure returns (uint256) {
        uint256 reward = BASE_REWARD;
        
        if (streakCount >= 7) {
            reward += WEEKLY_BONUS;
        }
        if (streakCount >= 30) {
            reward += MONTHLY_BONUS;
        }
        if (streakCount > 1) {
            reward += (streakCount * STREAK_MULTIPLIER);
        }
        
        if (totalSubmissions >= 100) {
            reward += 50;
        }
        
        return reward;
    }
    
    function updateCommunityMetrics(
        uint256 day,
        uint8 mood,
        uint8 anxiety,
        uint8 energy,
        uint8 sleep
    ) internal {
        CommunityMetrics storage metrics = dailyCommunityMetrics[day];
        
        metrics.totalSubmissionsToday += 1;
        
        // Update running averages
        if (metrics.averageMoodToday == 0) {
            metrics.averageMoodToday = mood;
        } else {
            metrics.averageMoodToday = (metrics.averageMoodToday * 9 + mood) / 10;
        }
        
        if (metrics.averageSleepToday == 0) {
            metrics.averageSleepToday = sleep;
        } else {
            metrics.averageSleepToday = (metrics.averageSleepToday * 9 + sleep) / 10;
        }
        
        metrics.lastUpdateTime = block.timestamp;
        emit CommunityMetricsUpdated(day);
    }
    
    function pauseContract() external onlyResearchCoordinator {
        isPaused = true;
    }
    
    function unpauseContract() external onlyResearchCoordinator {
        isPaused = false;
    }
    
    function grantResearchAccess(address researcher) external onlyResearchCoordinator {
        researchAccess[researcher] = true;
        emit ResearchAccessGranted(researcher);
    }
    
    function getUserProfile(address user) external view returns (
        bool isRegistered,
        uint256 lastSubmissionTime,
        uint16 streakCount,
        uint32 totalSubmissions,
        uint32 tokensEarned,
        uint256 registrationTime
    ) {
        UserProfile memory profile = users[user];
        return (
            profile.isRegistered,
            profile.lastSubmissionTime,
            profile.streakCount,
            profile.totalSubmissions,
            profile.tokensEarned,
            profile.registrationTime
        );
    }
    
    function getCommunityTrends(uint256 day) external view returns (
        uint32 totalSubmissions,
        uint16 averageMood,
        uint16 averageAnxiety,
        uint16 averageSleep,
        uint256 lastUpdateTime
    ) {
        CommunityMetrics memory metrics = dailyCommunityMetrics[day];
        return (
            metrics.totalSubmissionsToday,
            metrics.averageMoodToday,
            metrics.averageAnxietyToday,
            metrics.averageSleepToday,
            metrics.lastUpdateTime
        );
    }
    
    function getMyMoodData(uint256 day) external view onlyRegistered returns (
        uint8 mood,
        uint8 anxiety,
        uint8 energy,
        uint8 sleep,
        uint256 timestamp
    ) {
        MoodData memory moodData = userMoodHistory[msg.sender][day];
        require(moodData.isValid, "No data for this day");
        
        return (
            moodData.overallMood,
            moodData.anxietyLevel,
            moodData.energyLevel,
            moodData.sleepQuality,
            moodData.timestamp
        );
    }
    
    function getAggregatedInsights(uint256 startDay, uint256 endDay) 
        external 
        view 
        returns (
            uint16 moodTrend,
            uint16 anxietyTrend,
            uint16 sleepTrend,
            uint32 totalDataPoints
        ) 
    {
        require(researchAccess[msg.sender], "Research access required");
        
        uint256 today = block.timestamp / 1 days;
        CommunityMetrics memory todayMetrics = dailyCommunityMetrics[today];
        
        return (
            todayMetrics.averageMoodToday,
            todayMetrics.averageAnxietyToday,
            todayMetrics.averageSleepToday,
            todayMetrics.totalSubmissionsToday
        );
    }
}
