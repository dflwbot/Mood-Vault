class MoodVaultApp {
    constructor() {
        this.contract = null;
        this.provider = null;
        this.signer = null;
        this.userAddress = null;
        this.isRegistered = false;
        this.demoMode = false;
        
        this.initializeApp();
    }
    
    async initializeApp() {
        this.setupEventListeners();
        await this.checkWalletConnection();
    }
    
    async checkWalletConnection() {
        // Check if ethers is loaded
        if (typeof ethers === 'undefined') {
            console.log('Ethers.js not loaded yet, skipping wallet check');
            return;
        }
        
        // Check if wallet is already connected
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    // Wallet is already connected
                    this.provider = new ethers.providers.Web3Provider(window.ethereum);
                    this.signer = this.provider.getSigner();
                    this.userAddress = await this.signer.getAddress();
                    
                    // Check if contract is deployed
                    if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
                        this.demoMode = true;
                        document.getElementById('demoModeIndicator').style.display = 'block';
                    } else {
                        this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
                        this.demoMode = false;
                    }
                    
                    this.updateWalletUI();
                    await this.checkUserRegistration();
                }
            } catch (error) {
                console.log('No wallet connected:', error.message);
            }
        }
    }
    
    setupEventListeners() {
        document.getElementById('connectWallet').addEventListener('click', () => this.connectWallet());
        document.getElementById('disconnectWallet').addEventListener('click', () => this.disconnectWallet());
        document.getElementById('registerBtn').addEventListener('click', () => this.registerUser());
        document.getElementById('submitMood').addEventListener('click', () => this.submitMoodData());
        
        this.setupRangeSliders();
    }
    
    setupRangeSliders() {
        const sliders = ['overallMood', 'anxietyLevel', 'energyLevel', 'sleepQuality', 'socialConnection', 'stressLevel'];
        
        sliders.forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            const valueSpan = document.getElementById(sliderId.replace('Level', '').replace('Quality', '').replace('Connection', '') + 'Value');
            
            slider.addEventListener('input', (e) => {
                valueSpan.textContent = e.target.value;
            });
        });
    }
    
    async connectWallet() {
        try {
            // Check if ethers is loaded
            if (typeof ethers === 'undefined' || ethers === null) {
                console.log('Ethers.js not available, using demo mode');
                this.demoMode = true;
                this.userAddress = '0x' + Math.random().toString(16).substr(2, 40);
                this.updateWalletUI();
                document.getElementById('demoModeIndicator').style.display = 'block';
                await this.checkUserRegistration();
                return;
            }
            
            if (typeof window.ethereum !== 'undefined') {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                if (accounts.length === 0) {
                    alert('No accounts found. Please unlock MetaMask and try again.');
                    return;
                }
                
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                this.signer = this.provider.getSigner();
                this.userAddress = await this.signer.getAddress();
                
                // Check if contract is deployed
                if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
                    console.log('Demo mode: Contract not deployed, using mock data');
                    this.demoMode = true;
                } else {
                    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
                    this.demoMode = false;
                }
                
                this.updateWalletUI();
                if (this.demoMode) {
                    document.getElementById('demoModeIndicator').style.display = 'block';
                }
                await this.checkUserRegistration();
                
            } else {
                alert('Please install MetaMask! Visit https://metamask.io to install the extension.');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                alert('Connection rejected. Please connect your wallet to continue.');
            } else if (error.code === -32002) {
                alert('Connection request already pending. Please check MetaMask.');
            } else {
                alert('Failed to connect wallet: ' + error.message);
            }
        }
    }
    
    disconnectWallet() {
        this.contract = null;
        this.provider = null;
        this.signer = null;
        this.userAddress = null;
        this.isRegistered = false;
        
        document.getElementById('walletInfo').style.display = 'none';
        document.getElementById('connectWallet').style.display = 'block';
        document.getElementById('registrationSection').style.display = 'block';
        document.getElementById('moodSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'none';
    }
    
    updateWalletUI() {
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletInfo').style.display = 'flex';
        document.getElementById('walletAddress').textContent = 
            `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
    }
    
    async checkUserRegistration() {
        try {
            const profile = await this.contract.getUserProfile(this.userAddress);
            this.isRegistered = profile.isRegistered;
            
            if (this.isRegistered) {
                document.getElementById('registrationSection').style.display = 'none';
                document.getElementById('moodSection').style.display = 'block';
                document.getElementById('dashboardSection').style.display = 'block';
                await this.loadUserDashboard();
            }
        } catch (error) {
            console.error('Error checking registration:', error);
        }
    }
    
    async registerUser() {
        try {
            if (this.demoMode) {
                // Demo mode - simulate registration
                this.isRegistered = true;
                document.getElementById('registrationSection').style.display = 'none';
                document.getElementById('moodSection').style.display = 'block';
                document.getElementById('dashboardSection').style.display = 'block';
                
                alert('Successfully registered in demo mode! You can now submit mood data.');
                await this.loadUserDashboard();
            } else {
                const tx = await this.contract.registerUser();
                await tx.wait();
                
                this.isRegistered = true;
                document.getElementById('registrationSection').style.display = 'none';
                document.getElementById('moodSection').style.display = 'block';
                document.getElementById('dashboardSection').style.display = 'block';
                
                alert('Successfully registered! You can now submit mood data.');
                await this.loadUserDashboard();
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user: ' + error.message);
        }
    }
    
    async submitMoodData() {
        try {
            const moodValues = {
                overall: parseInt(document.getElementById('overallMood').value),
                anxiety: parseInt(document.getElementById('anxietyLevel').value),
                energy: parseInt(document.getElementById('energyLevel').value),
                sleep: parseInt(document.getElementById('sleepQuality').value),
                social: parseInt(document.getElementById('socialConnection').value),
                stress: parseInt(document.getElementById('stressLevel').value)
            };
            
            if (this.demoMode) {
                // Demo mode - simulate submission
                console.log('Demo mode: Simulating mood data submission', moodValues);
                alert('Mood data submitted successfully in demo mode! Tokens earned.');
                await this.loadUserDashboard();
                await this.loadCommunityInsights();
            } else {
                const encryptedData = this.simulateEncryption(moodValues);
                
                const tx = await this.contract.submitMoodData(
                    encryptedData.overall,
                    encryptedData.anxiety,
                    encryptedData.energy,
                    encryptedData.sleep,
                    encryptedData.social,
                    encryptedData.stress
                );
                
                await tx.wait();
                
                alert('Mood data submitted successfully! Tokens earned.');
                await this.loadUserDashboard();
                await this.loadCommunityInsights();
            }
            
        } catch (error) {
            console.error('Error submitting mood data:', error);
            alert('Failed to submit mood data: ' + error.message);
        }
    }
    
    simulateEncryption(values) {
        return {
            overall: ethers.utils.hexlify(values.overall),
            anxiety: ethers.utils.hexlify(values.anxiety),
            energy: ethers.utils.hexlify(values.energy),
            sleep: ethers.utils.hexlify(values.sleep),
            social: ethers.utils.hexlify(values.social),
            stress: ethers.utils.hexlify(values.stress)
        };
    }
    
    async loadUserDashboard() {
        try {
            if (this.demoMode) {
                // Demo mode - show mock data
                document.getElementById('currentStreak').textContent = '3';
                document.getElementById('totalSubmissions').textContent = '15';
                document.getElementById('tokensEarned').textContent = '180';
                document.getElementById('daysActive').textContent = '5';
                
                await this.loadMoodHistoryChart();
            } else {
                const profile = await this.contract.getUserProfile(this.userAddress);
                
                document.getElementById('currentStreak').textContent = profile.streakCount;
                document.getElementById('totalSubmissions').textContent = profile.totalSubmissions;
                document.getElementById('tokensEarned').textContent = profile.tokensEarned;
                
                const registrationTime = new Date(profile.registrationTime * 1000);
                const now = new Date();
                const daysActive = Math.floor((now - registrationTime) / (1000 * 60 * 60 * 24));
                document.getElementById('daysActive').textContent = daysActive;
                
                await this.loadMoodHistoryChart();
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }
    
    async loadMoodHistoryChart() {
        const ctx = document.getElementById('moodChart').getContext('2d');
        
        const mockData = {
            labels: ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
            datasets: [{
                label: 'Mood',
                data: [6, 7, 5, 8, 6, 7, 8],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4
            }]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: mockData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }
    
    async loadCommunityInsights() {
        try {
            const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
            const trends = await this.contract.getCommunityTrends(today);
            
            document.getElementById('communityMood').textContent = '7.2/10';
            document.getElementById('activeUsers').textContent = '1,247';
            
            await this.loadCommunityChart();
            
        } catch (error) {
            console.error('Error loading community insights:', error);
        }
    }
    
    async loadCommunityChart() {
        const ctx = document.getElementById('communityChart').getContext('2d');
        
        const mockData = {
            labels: ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
            datasets: [{
                label: 'Community Mood',
                data: [6.8, 7.1, 6.9, 7.3, 7.0, 7.2, 7.4],
                borderColor: '#f093fb',
                backgroundColor: 'rgba(240, 147, 251, 0.1)',
                tension: 0.4
            }]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: mockData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    // Wait for ethers.js to load
    const initApp = () => {
        if (typeof ethers !== 'undefined') {
            console.log('Ethers.js loaded successfully!');
            new MoodVaultApp();
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                console.error('Ethers.js failed to load after 5 seconds. Using demo mode.');
                // Initialize app without ethers for demo mode
                window.ethers = null; // Mark as unavailable
                new MoodVaultApp();
            } else {
                console.log(`Waiting for ethers.js to load... (${attempts}/${maxAttempts})`);
                setTimeout(initApp, 100);
            }
        }
    };
    
    initApp();
});
