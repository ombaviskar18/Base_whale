# 🔧 Whale Hunter Setup Guide

## 📋 Required API Keys & Services

### 1. **Alchemy API** (For Blockchain Monitoring)
- **Website**: https://www.alchemy.com/
- **Steps**:
  1. Sign up for free account
  2. Create new project → Select "Ethereum" and "Base"
  3. Copy your API key from dashboard
  4. Get WebSocket URLs:
     - Ethereum: `wss://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY`
     - Base: `wss://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY`

### 2. **Etherscan API** (For Transaction Data)
- **Website**: https://etherscan.io/apis
- **Steps**:
  1. Create account on Etherscan
  2. Go to "API Keys" section
  3. Generate new API key (free tier: 5 calls/sec)

### 3. **OpenSea API** (For NFT Data)
- **Website**: https://docs.opensea.io/reference/api-overview
- **Steps**:
  1. Sign up at https://opensea.io/
  2. Request API access through their developer portal
  3. Get API key for NFT marketplace data

### 4. **CoinGecko API** (For Price Data)
- **Website**: https://www.coingecko.com/en/api
- **Steps**:
  1. Free tier available (no key needed for basic calls)
  2. For higher limits, sign up for Pro API key

### 5. **WalletConnect Project ID** (For Wallet Connection)
- **Website**: https://cloud.walletconnect.com/
- **Steps**:
  1. Sign up for free account
  2. Create new project
  3. Copy your Project ID

### 6. **XMTP Network** (For Messaging)
- **Website**: https://xmtp.org/
- **Steps**:
  1. Use development environment (no key needed)
  2. For production: Follow XMTP docs for mainnet setup

## 🔐 Environment Variables Setup

Create `.env.local` file in your project root:

```bash
# Blockchain APIs
ALCHEMY_API_KEY=your_alchemy_api_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
OPENSEA_API_KEY=your_opensea_api_key_here

# Wallet Connection
WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# XMTP Configuration
XMTP_ENV=dev
ENCRYPTION_KEY=your_32_byte_encryption_key_here

# Network URLs
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
BASE_RPC_URL=https://mainnet.base.org
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Game Configuration
WHALE_ALERT_THRESHOLD=50000
GAME_TIMEOUT=300000
BOT_NAME=WhaleHunterBot
```

## 🚀 Installation Steps

### 1. **Install Dependencies**
```bash
cd guess-the-whale
npm install
```

### 2. **Additional Wallet Integration**
```bash
npm install @web3modal/ethers ethers@^6.0.0 @walletconnect/modal
```

### 3. **Environment Setup**
```bash
# Copy example environment file
cp .env.local.example .env.local

# Edit with your API keys
nano .env.local
```

### 4. **Start Development**
```bash
npm run dev
```

## 🔗 Useful Links

### **Learning Resources**
- **XMTP Docs**: https://docs.xmtp.org/
- **AgentKit Docs**: https://github.com/coinbase/agentkit
- **Base Network**: https://docs.base.org/
- **Alchemy Webhooks**: https://docs.alchemy.com/docs/notify-api

### **Blockchain Explorers**
- **Ethereum**: https://etherscan.io/
- **Base**: https://basescan.org/
- **Polygon**: https://polygonscan.com/

### **Testing Tools**
- **XMTP Chat**: https://xmtp.chat/
- **Base Testnet Faucet**: https://faucet.basegoerli.org/
- **Ethereum Testnet Faucet**: https://faucets.chain.link/

## 🧪 Testing Whale Addresses

Use these real whale addresses for testing:

```typescript
const FAMOUS_WHALES = {
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": "Vitalik Buterin",
  "0x6CC5F688a315f3dC28A7781717a9A798a59fDA7b": "Punk6529", 
  "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459": "Pranksy",
  "0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872": "WhaleShark",
  "0x8bc47Be1E3baCF3b77e8C1930f2073F5DD6C9f24": "Beanie"
};
```

## 🔍 Monitoring Setup

### **Real-time Alerts**
1. **Large Transfers**: > $50,000 USD
2. **NFT Purchases**: > $10,000 USD  
3. **DeFi Activities**: > $25,000 USD
4. **Token Accumulation**: > 100 ETH

### **Networks Monitored**
- ✅ Ethereum Mainnet
- ✅ Base Mainnet
- 🔄 Polygon (Coming Soon)
- 🔄 Arbitrum (Coming Soon)

## 🎯 Production Deployment

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Environment Variables in Vercel**
Add all your `.env.local` variables to Vercel dashboard under:
`Project Settings → Environment Variables`

## 🐛 Troubleshooting

### **Common Issues**
1. **CORS Errors**: Use server-side API calls for external APIs
2. **WebSocket Failures**: Implement fallback to HTTP polling
3. **Rate Limits**: Cache API responses and implement backoff
4. **XMTP Errors**: Ensure wallet has ETH for transaction fees

### **Debug Mode**
```bash
# Enable debug logging
DEBUG=whale-hunter:* npm run dev
```

## 📞 Support

- **XMTP Discord**: https://discord.gg/xmtp
- **Base Discord**: https://discord.gg/buildonbase
- **Alchemy Discord**: https://discord.gg/alchemy 