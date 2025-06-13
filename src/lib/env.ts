interface EnvironmentConfig {
  // Blockchain APIs
  alchemyApiKey?: string;
  etherscanApiKey?: string;
  openSeaApiKey?: string;
  coinGeckoApiKey?: string;
  
  // Wallet Connection
  walletConnectProjectId?: string;
  
  // XMTP
  xmtpEnv: string;
  encryptionKey?: string;
  
  // Network URLs
  ethereumRpcUrl?: string;
  baseRpcUrl?: string;
  polygonRpcUrl?: string;
  
  // Game Configuration
  whaleAlertThreshold: number;
  gameTimeout: number;
  botName: string;
  
  // Telegram Bot
  telegramBotToken?: string;
  telegramChatId?: string;
  telegramBotUsername?: string;
  botServerUrl?: string;
  
  // Development
  isDevelopment: boolean;
  isProduction: boolean;
}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadEnvironmentConfig();
  }

  private loadEnvironmentConfig(): EnvironmentConfig {
    // Load from environment variables or use your provided defaults
    return {
      // Blockchain APIs
      alchemyApiKey: process.env.ALCHEMY_API_KEY || 'x2fFyeL-BONypwQZ6fc1DyhRnghyCow5',
      etherscanApiKey: process.env.ETHERSCAN_API_KEY || 'MCB4YKVKGZMRJCHH7EVZH1Y3KCKZRDI83S',
      openSeaApiKey: process.env.OPENSEA_API_KEY || 'f37de42161c14ffc86654d714d02bbb6',
      coinGeckoApiKey: process.env.COINGECKO_API_KEY || 'CG-cWq5AJmVDhc31ohUQzRjWE1w',
      
      // Wallet Connection
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'aad626052f5e095526b51b717eaa973b',
      
      // XMTP
      xmtpEnv: process.env.XMTP_ENV || 'dev',
      encryptionKey: process.env.ENCRYPTION_KEY || '2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c',
      
      // Network URLs
      ethereumRpcUrl: process.env.ETHEREUM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5',
      baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
      polygonRpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-mainnet.g.alchemy.com/v2/x2fFyeL-BONypwQZ6fc1DyhRnghyCow5',
      
      // Game Configuration
      whaleAlertThreshold: parseInt(process.env.WHALE_ALERT_THRESHOLD || '50000'),
      gameTimeout: parseInt(process.env.GAME_TIMEOUT || '300000'),
      botName: process.env.BOT_NAME || 'WhaleHunterBot',
      
      // Telegram Bot
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '8060135249:AAGPps8LWa1Ov6IrkmatFKSJ0XZZJSSdjYQ',
      telegramChatId: process.env.TELEGRAM_CHAT_ID || '1382805134',
      telegramBotUsername: process.env.TELEGRAM_BOT_USERNAME || 'Whale_alerting_bot',
      botServerUrl: process.env.BOT_SERVER_URL,
      
      // Development
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
    };
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }

  public getBlockchainConfig() {
    return {
      alchemyApiKey: this.config.alchemyApiKey,
      etherscanApiKey: this.config.etherscanApiKey,
      openSeaApiKey: this.config.openSeaApiKey,
      coinGeckoApiKey: this.config.coinGeckoApiKey,
      ethereumRpcUrl: this.config.ethereumRpcUrl,
      baseRpcUrl: this.config.baseRpcUrl,
      polygonRpcUrl: this.config.polygonRpcUrl,
    };
  }

  public getTelegramConfig() {
    return {
      botToken: this.config.telegramBotToken || '8060135249:AAGPps8LWa1Ov6IrkmatFKSJ0XZZJSSdjYQ',
      chatId: this.config.telegramChatId,
      botUsername: this.config.telegramBotUsername || 'Whale_alerting_bot',
      botServerUrl: this.config.botServerUrl,
    };
  }

  public getWhaleMonitorConfig() {
    return {
      alchemyApiKey: this.config.alchemyApiKey,
      etherscanApiKey: this.config.etherscanApiKey,
      coinGeckoApiKey: this.config.coinGeckoApiKey,
      minTransferUSD: this.config.whaleAlertThreshold,
      networks: ['ethereum', 'base', 'polygon'],
      whaleThreshold: this.config.whaleAlertThreshold,
    };
  }

  public getXMTPConfig() {
    return {
      env: this.config.xmtpEnv,
      encryptionKey: this.config.encryptionKey,
    };
  }

  public validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check critical configurations
    if (!this.config.walletConnectProjectId) {
      errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for wallet connection');
    }

    if (!this.config.telegramBotToken) {
      console.warn('TELEGRAM_BOT_TOKEN not found, using default bot token');
    }

    if (!this.config.alchemyApiKey) {
      errors.push('ALCHEMY_API_KEY is recommended for real-time whale monitoring');
    }

    if (!this.config.coinGeckoApiKey) {
      console.warn('COINGECKO_API_KEY not found, using free tier with rate limits');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public logConfiguration(): void {
    console.log('🔧 Environment Configuration:');
    console.log(`├── Environment: ${this.config.isDevelopment ? 'Development' : 'Production'}`);
    console.log(`├── Alchemy API: ${this.config.alchemyApiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log(`├── CoinGecko API: ${this.config.coinGeckoApiKey ? '✅ Configured' : '⚠️ Using free tier'}`);
    console.log(`├── WalletConnect: ${this.config.walletConnectProjectId ? '✅ Configured' : '❌ Missing'}`);
    console.log(`├── Telegram Bot: ${this.config.telegramBotToken ? '✅ Configured' : '⚠️ Using default'}`);
    console.log(`├── Whale Threshold: $${(this.config.whaleAlertThreshold / 1000).toFixed(0)}K`);
    console.log(`└── Bot Name: ${this.config.botName}`);
  }
}

// Export singleton instance
export const environmentManager = new EnvironmentManager();

// Export convenience functions
export const getConfig = () => environmentManager.getConfig();
export const getBlockchainConfig = () => environmentManager.getBlockchainConfig();
export const getTelegramConfig = () => environmentManager.getTelegramConfig();
export const getWhaleMonitorConfig = () => environmentManager.getWhaleMonitorConfig();
export const getXMTPConfig = () => environmentManager.getXMTPConfig();
export const validateConfiguration = () => environmentManager.validateConfiguration();
export const logConfiguration = () => environmentManager.logConfiguration(); 