# 🔧 Environment Configuration Guide

## Step 1: Create Environment File

Create a file named `.env.local` in the root directory of your project (same level as package.json) with the following content:

```env
# =============================================================================
# 🐋 WHALE HUNTER - ENVIRONMENT CONFIGURATION
# =============================================================================

# =============================================================================
# BLOCKCHAIN APIs
# =============================================================================
ALCHEMY_API_KEY=x2fFyeL-BONypwQZ6fc1DyhRnghyCow5
ETHERSCAN_API_KEY=MCB4YKVKGZMRJCHH7EVZH1Y3KCKZRDI83S
OPENSEA_API_KEY=f37de42161c14ffc86654d714d02bbb6
COINGECKO_API_KEY=CG-cWq5AJmVDhc31ohUQzRjWE1w

# =============================================================================
# WEBSOCKET CONNECTIONS  
# =============================================================================
ETH_WEBSOCKET_URL=wss://eth-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5
BASE_WEBSOCKET_URL=wss://base-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5

# =============================================================================
# RPC NETWORK ENDPOINTS
# =============================================================================
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5
BASE_RPC_URL=https://mainnet.base.org
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5

# =============================================================================
# WALLET CONNECTION (PUBLIC - Safe to expose)
# =============================================================================
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=aad626052f5e095526b51b717eaa973b
NEXT_PUBLIC_ENABLE_TESTNETS=false

# =============================================================================
# XMTP MESSAGING
# =============================================================================
XMTP_ENV=dev
ENCRYPTION_KEY=2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c

# =============================================================================
# TELEGRAM BOT INTEGRATION
# =============================================================================
TELEGRAM_BOT_TOKEN=8060135249:AAGPps8LWa1Ov6IrkmatFKSJ0XZZJSSdjYQ
TELEGRAM_CHAT_ID=1382805134
TELEGRAM_BOT_USERNAME=Whale_alerting_bot

# =============================================================================
# GAME CONFIGURATION
# =============================================================================
WHALE_ALERT_THRESHOLD=50000
GAME_TIMEOUT=300000
BOT_NAME=WhaleHunterBot
```

## Step 2: Verify Environment Variables

### ✅ Required Variables
Your provided configuration includes all required variables:

- **ALCHEMY_API_KEY**: ✅ Configured for blockchain monitoring
- **ETHERSCAN_API_KEY**: ✅ Configured for transaction verification
- **OPENSEA_API_KEY**: ✅ Configured for NFT data
- **COINGECKO_API_KEY**: ✅ Configured for price feeds
- **WALLETCONNECT_PROJECT_ID**: ✅ Configured for wallet connections
- **TELEGRAM_BOT_TOKEN**: ✅ Configured for whale alerts

### 🔗 WebSocket URLs
Your WebSocket URLs are properly formatted:
- Ethereum: `wss://eth-mainnet.g.alchemy.com/v2/[API_KEY]`
- Base: `wss://base-mainnet.g.alchemy.com/v2/[API_KEY]`

### 📡 RPC Endpoints
All RPC endpoints are correctly configured for multi-chain support.

## Step 3: Environment Variable Usage

### In the Application
The environment variables are used as follows:

```typescript
// Environment configuration (src/lib/env.ts)
const config = {
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  etherscanApiKey: process.env.ETHERSCAN_API_KEY,
  openSeaApiKey: process.env.OPENSEA_API_KEY,
  coinGeckoApiKey: process.env.COINGECKO_API_KEY,
  // ... other configs
};
```

### Whale Monitoring
```typescript
// Real-time monitoring with your Alchemy key
const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});
```

### XMTP Integration
```typescript
// XMTP client configuration
const client = await Client.create(wallet, {
  env: process.env.XMTP_ENV || 'dev'
});
```

## Step 4: Security Best Practices

### ✅ What's Already Secure
- All sensitive keys are in environment variables
- Public keys are properly prefixed with `NEXT_PUBLIC_`
- No hardcoded secrets in the codebase

### 🔒 Additional Recommendations
1. **Never commit .env.local to version control**
2. **Rotate API keys regularly**
3. **Monitor API usage and rate limits**
4. **Use different keys for production**

## Step 5: Testing Configuration

After creating your `.env.local` file, test the configuration:

```bash
# Check if environment is loaded correctly
npm run dev

# Look for these console messages:
# ✅ Environment Configuration loaded
# ✅ Alchemy API key configured
# ✅ XMTP environment: dev
# ✅ Whale monitoring threshold: $50K
```

## Step 6: Production Deployment

For production deployment, set these environment variables in your hosting platform:

### Vercel
```bash
vercel env add ALCHEMY_API_KEY
vercel env add ETHERSCAN_API_KEY
# ... add all other variables
```

### Railway/Heroku
Add all variables through their dashboard or CLI.

## 🚨 Important Notes

### API Rate Limits
- **Alchemy**: 100 requests/second (your plan may vary)
- **CoinGecko**: 50 calls/minute (free tier)
- **Etherscan**: 5 calls/second (free tier)

### Environment Specific Values
- **Development**: Use `XMTP_ENV=dev`
- **Production**: Use `XMTP_ENV=production`

### Troubleshooting
If you see errors related to missing environment variables:

1. **Check file location**: `.env.local` should be in root directory
2. **Check file name**: Must be exactly `.env.local` (not `.env` or `.env.local.txt`)
3. **Restart development server**: Environment changes require restart
4. **Check syntax**: No spaces around `=` signs

## ✅ Final Verification

Your configuration is properly set up when you see:

```bash
🔧 Environment Configuration:
├── Environment: Development
├── Alchemy API: ✅ Configured  
├── CoinGecko API: ✅ Configured
├── WalletConnect: ✅ Configured
├── Telegram Bot: ✅ Configured
├── Whale Threshold: $50K
└── Bot Name: WhaleHunterBot
```

The application should now run error-free with full functionality! 🐋 