# 🐋 Whale Hunter - XMTP Demo Guide

## Overview
Whale Hunter is a revolutionary crypto trivia game that combines XMTP messaging, real-time blockchain monitoring, and AI-powered questions. Players chat with an AI bot via XMTP to answer questions about famous crypto whales while receiving live whale movement alerts.

## 🚀 Key Features Implemented

### 1. XMTP Integration (`/src/services/xmtpGameService.ts`)
- **Real XMTP Client**: Creates actual XMTP client connections
- **Bot Conversations**: Players can chat directly with the whale hunting bot
- **Command System**: `/start`, `/help`, `/hint`, `/score`, `/whale` commands
- **Session Management**: Tracks multiple concurrent game sessions

### 2. Real-time Whale Monitoring (`/src/lib/realTimeWhaleMonitor.ts`)
- **Live Blockchain Monitoring**: Tracks famous whale wallets using Alchemy API
- **Multi-chain Support**: Ethereum, Base, and Polygon networks
- **Famous Whale Database**: 
  - Vitalik Buterin (0xd8dA6BF2...)
  - Punk6529 (0x6CC5F688...)
  - Pranksy (0xd387a6e4...)
  - WhaleShark (0x020cA66C...)
  - Beanie (0x8bc47Be1...)

### 3. MCQ Trivia Questions
- **Dynamic Questions**: Generated based on real whale activity
- **Contextual Information**: Each question includes whale background
- **Hint System**: 3-tier hint system with point deductions
- **Time Limits**: Pressure-based scoring system

### 4. User Profile System (`/src/lib/userProfileManager.ts`)
- **Profile Tracking**: XP, levels, achievements, game stats
- **Achievement System**: 15+ achievements for different milestones
- **Asset Tracking**: Integration with user's on-chain assets
- **Leaderboards**: Global ranking system

## 🎮 How to Play

### Step 1: Connect Wallet
```
Visit: http://localhost:3000
Click "Connect Wallet" in the navbar
```

### Step 2: Access XMTP Chat
```
Click "🐋 Launch XMTP Whale Hunter" button
This opens the real-time chat interface
```

### Step 3: Start Playing
```
In the chat, type: /start
The bot will begin asking whale trivia questions
Answer with A, B, C, or D
Use /hint for clues (costs 20 points)
```

### Step 4: Receive Live Alerts
```
Bot monitors real whale wallets
When whales move funds, you get instant alerts
New questions are generated from real activity
```

## 🔧 Technical Implementation

### XMTP Service Integration
```typescript
// Initialize XMTP client
const client = await Client.create(wallet, { env: 'dev' });

// Listen for incoming messages
const stream = await client.conversations.stream();
for await (const conversation of stream) {
  handleConversation(conversation);
}
```

### Whale Monitoring
```typescript
// Track whale wallets with Alchemy
const transfers = await alchemy.core.getAssetTransfers({
  fromAddress: whaleAddress,
  category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
});

// Generate alerts for significant transfers
if (valueUSD > threshold) {
  emit('whaleAlert', createAlert(whale, transaction));
}
```

### Real-time Question Generation
```typescript
// Questions tied to whale context
const question = {
  question: `🐋 A whale just moved 2,000 ETH from ${whaleAddress}... Who is this?`,
  whaleContext: {
    whaleAddress: whale.address,
    whaleName: whale.name,
    recentActivity: 'Large charitable donation detected'
  }
};
```

## 📱 User Experience Flow

1. **Welcome Screen**: Beautiful landing with game explanation
2. **Wallet Connection**: Seamless Web3Modal integration
3. **Chat Interface**: Real-time XMTP messaging with bot
4. **Live Monitoring**: Whale alerts appear in chat instantly
5. **Trivia Questions**: MCQ format with whale context
6. **Scoring System**: Points, streaks, achievements
7. **Leaderboards**: Competition with other players

## 🌐 Live Features

### Current Implementations
✅ XMTP messaging integration
✅ Whale wallet monitoring
✅ MCQ question system
✅ User profiles and achievements
✅ Real-time chat interface
✅ Whale alert system
✅ Multi-chain support preparation

### Demo Data
- **Simulated Whale Alerts**: Every 30-90 seconds for demonstration
- **Famous Whale Addresses**: Real addresses of known crypto personalities
- **Price Integration**: Live ETH/BTC prices from CoinGecko
- **Question Database**: 5+ whale-specific questions with hints


## 🎯 Next Steps for Full Production

1. **Real XMTP Bot Deployment**: Deploy bot to persistent server
2. **Enhanced Whale Detection**: More sophisticated on-chain analysis
3. **NFT Integration**: Track NFT purchases and flips
4. **Social Features**: Group chats, tournaments
5. **Token Rewards**: Actual token distribution for winners
6. **Mobile App**: React Native XMTP implementation

## 🚨 Live Demo Commands

Try these commands in the XMTP chat:

- `/start` - Begin trivia game
- `/help` - Show all commands
- `/whale` - Show monitoring stats
- `/hint` - Get question hint (-20 points)
- `/score` - View current score
- `A`, `B`, `C`, `D` - Answer questions

---

**🎮 Start Playing**: Connect your wallet and click "Launch XMTP Whale Hunter" to begin! 