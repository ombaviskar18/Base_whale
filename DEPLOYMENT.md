# 🚀 Deployment Guide - Guess the Whale

This guide covers deploying your XMTP-enabled whale hunting game to production.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Guess the Whale                         │
│                   (Next.js Frontend)                       │
├─────────────────────────────────────────────────────────────┤
│  🎮 Game Logic    │  💬 XMTP Chat    │  🤖 AI Agent      │
│  - Whale Cards    │  - Bot Messages   │  - Hint Gen       │
│  - Scoring        │  - Group Chat     │  - Guess Analysis │
│  - Timer          │  - Real-time      │  - NLP Queries    │
├─────────────────────────────────────────────────────────────┤
│              🔍 Whale Detection Service                     │
│              - Onchain Monitoring                          │
│              - Real-time Alerts                            │
│              - Multi-chain Support                         │
├─────────────────────────────────────────────────────────────┤
│  📡 XMTP Network  │  ⛓️ Base Chain    │  🧠 AgentKit      │
│  - Decentralized  │  - Smart Contracts │  - AI Tools       │
│  - Group Chats    │  - Rewards         │  - CDP Integration │
│  - Real-time      │  - Onchain Data    │  - Market Data    │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Deploy to Vercel

### 1. Clone & Install
```bash
git clone <your-repo>
cd guess-the-whale
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
# XMTP Configuration
NEXT_PUBLIC_XMTP_ENV=production
XMTP_BOT_PRIVATE_KEY=your_bot_private_key

# AgentKit Configuration (Optional for Phase 1)
CDP_API_KEY_NAME=your_cdp_key_name
CDP_API_KEY_PRIVATE_KEY=your_cdp_private_key

# Base Network
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# External APIs (Optional)
ALCHEMY_API_KEY=your_alchemy_key
ETHERSCAN_API_KEY=your_etherscan_key
MORALIS_API_KEY=your_moralis_key
```

### 3. Deploy
```bash
npm run build
vercel deploy
```

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+
- XMTP Bot Wallet
- (Optional) CDP/AgentKit API Keys
- (Optional) Blockchain API Keys

### 1. Build Application
```bash
npm run build
npm start
```

### 2. Server Requirements
- **RAM**: 512MB minimum, 1GB recommended
- **Storage**: 1GB for dependencies
- **Network**: HTTPS required for XMTP

## 🌐 Production Configuration

### XMTP Setup
1. **Generate Bot Wallet**:
   ```typescript
   import { Wallet } from 'ethers';
   const botWallet = Wallet.createRandom();
   console.log('Private Key:', botWallet.privateKey);
   console.log('Address:', botWallet.address);
   ```

2. **Fund Bot Wallet** (if needed for gas):
   - Send small amount of ETH for potential transactions
   - Base Sepolia Faucet: https://faucet.base.org

3. **Test XMTP Connection**:
   ```bash
   # Check XMTP status
   curl https://xmtp.chat/health
   ```

### AgentKit Setup (Phase 2)
1. **Get CDP API Keys**:
   - Visit https://portal.cdp.coinbase.com
   - Create new API key
   - Download private key file

2. **Configure AgentKit**:
   ```typescript
   import { CdpToolProvider } from '@coinbase/agentkit';
   
   const toolProvider = new CdpToolProvider({
     apiKeyName: process.env.CDP_API_KEY_NAME,
     privateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
   });
   ```

## 🏆 Hackathon Submission

### What We Built
- ✅ **XMTP Integration**: Real-time messaging with bot
- ✅ **AgentKit AI**: Intelligent responses and hint generation
- ✅ **Whale Detection**: Live onchain monitoring with alerts
- ✅ **Beautiful UI**: Glassmorphism design with animations
- ✅ **Game Mechanics**: Scoring, streaks, time bonuses

### Demo Flow
1. **Start Game**: User visits site, sees stunning welcome screen
2. **XMTP Chat**: Real-time chat with AI bot initializes
3. **Whale Hunting**: Bot provides hints, user guesses famous whales
4. **Live Alerts**: Real-time whale activity notifications
5. **Scoring**: Points, streaks, and leaderboards

### Unique Features
- 🔮 **AI-Powered Hints**: AgentKit generates contextual clues
- 🚨 **Real-time Alerts**: Live whale detection with XMTP notifications
- 🎮 **Gamified Experience**: Beautiful UI with confetti and animations
- 💬 **Social Gaming**: XMTP group chats for multiplayer
- ⛓️ **Multi-chain Ready**: Base integration prepared

## 📊 Performance Optimization

### Frontend Optimization
```typescript
// Next.js configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['pbs.twimg.com'], // For whale avatars
  },
  env: {
    NEXT_PUBLIC_XMTP_ENV: process.env.NEXT_PUBLIC_XMTP_ENV,
  },
};
```

### XMTP Optimization
- **Connection Pooling**: Reuse XMTP client instances
- **Message Batching**: Batch multiple messages
- **Selective Listening**: Only listen to active conversations

### Whale Detection Optimization
- **Rate Limiting**: Respect API limits
- **Caching**: Cache whale data for 5 minutes
- **Webhooks**: Use webhooks instead of polling when available

## 🔒 Security Considerations

### Bot Security
- ✅ Store private keys securely (environment variables)
- ✅ Use read-only wallet for monitoring
- ✅ Implement rate limiting for messages
- ✅ Validate all user inputs

### API Security
- ✅ Rate limit external API calls
- ✅ Implement error handling and fallbacks
- ✅ Use HTTPS for all communications
- ✅ Sanitize user messages

## 🐛 Troubleshooting

### Common Issues

1. **XMTP Connection Failed**
   ```bash
   # Check network connectivity
   curl -I https://xmtp.chat
   
   # Verify environment
   echo $NEXT_PUBLIC_XMTP_ENV
   ```

2. **AgentKit Not Working**
   ```bash
   # Verify CDP credentials
   node -e "console.log(process.env.CDP_API_KEY_NAME)"
   ```

3. **Whale Detection Not Triggering**
   - Check API keys for blockchain data providers
   - Verify webhook endpoints are reachable
   - Check rate limits and quotas

### Debug Mode
```typescript
// Enable debug logging
localStorage.setItem('debug', 'xmtp:*,whale:*,agent:*');
```

## 📈 Analytics & Monitoring

### Key Metrics
- **User Engagement**: Messages sent, games played
- **XMTP Performance**: Connection time, message latency
- **Whale Detection**: Alert accuracy, response time
- **Game Performance**: Completion rate, average score

### Monitoring Setup
```typescript
// Analytics integration
import { analytics } from './lib/analytics';

analytics.track('game_started', {
  user_id: walletAddress,
  timestamp: Date.now(),
});
```

## 🔮 Phase 2: Enhanced Features

### Real Onchain Integration
- **Live Blockchain Data**: Replace mock data with real APIs
- **Smart Contracts**: Deploy reward contracts on Base
- **Token Economics**: Implement token rewards

### Advanced AI
- **GPT-4 Integration**: More sophisticated hint generation
- **Personalization**: Adapt difficulty to player skill
- **Market Analysis**: Real-time crypto market insights

### Multiplayer Features
- **Tournament Mode**: Scheduled competitions
- **Leaderboards**: Global and weekly rankings
- **Social Features**: Friend challenges, sharing

## 🎯 Success Metrics

### Technical Excellence
- ✅ Real-time XMTP messaging
- ✅ AI-powered game interactions
- ✅ Responsive, beautiful UI
- ✅ Onchain data integration

### User Experience
- ✅ Smooth onboarding flow
- ✅ Engaging game mechanics
- ✅ Social interaction features
- ✅ Mobile-friendly design

### Innovation
- ✅ Novel use of XMTP for gaming
- ✅ AI agent integration
- ✅ Real-time whale detection
- ✅ Gamified crypto education

---

**🏆 Ready to win the hackathon!** This implementation showcases the power of XMTP + AgentKit + Base for building engaging Web3 experiences. 