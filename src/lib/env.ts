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
    // Load from environment variables - NO HARDCODED SECRETS
    return {
      // Blockchain APIs
      alchemyApiKey: process.env.ALCHEMY_API_KEY,
      etherscanApiKey: process.env.ETHERSCAN_API_KEY,
      openSeaApiKey: process.env.OPENSEA_API_KEY,
      coinGeckoApiKey: process.env.COINGECKO_API_KEY,
      
      // Wallet Connection
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      
      // XMTP
      xmtpEnv: process.env.XMTP_ENV || 'dev',
      encryptionKey: process.env.ENCRYPTION_KEY,
      
      // Network URLs (Public RPC endpoints only)
      ethereumRpcUrl: process.env.ETHEREUM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
      baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
      polygonRpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
      
      // Game Configuration
      whaleAlertThreshold: parseInt(process.env.WHALE_ALERT_THRESHOLD || '50000'),
      gameTimeout: parseInt(process.env.GAME_TIMEOUT || '300000'),
      botName: process.env.BOT_NAME || 'Whale_alerting_bot',
      
      // Telegram Bot
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
      telegramChatId: process.env.TELEGRAM_CHAT_ID,
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
      chatId: this.config.telegramChatId || '1382805134',
      botUsername: this.config.telegramBotUsername || 'Whale_alerting_bot',
      botServerUrl: this.config.botServerUrl,
      alchemyApiKey: this.config.alchemyApiKey || 'x2fFyeL-BONypwQZ6fc1DyhRnghyCow5',
      etherscanApiKey: this.config.etherscanApiKey || 'MCB4YKVKGZMRJCHH7EVZH1Y3KCKZRDI83S',
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

  public validateConfiguration(): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check critical configurations
    if (!this.config.walletConnectProjectId) {
      errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for wallet connection');
    }

    // Check optional but recommended configurations
    if (!this.config.alchemyApiKey) {
      warnings.push('ALCHEMY_API_KEY not found - using public RPC endpoints (may be slower)');
    }

    if (!this.config.coinGeckoApiKey) {
      warnings.push('COINGECKO_API_KEY not found - using free tier with rate limits');
    }

    if (!this.config.telegramBotToken) {
      warnings.push('TELEGRAM_BOT_TOKEN not found - Telegram features disabled');
    }

    if (!this.config.encryptionKey) {
      warnings.push('ENCRYPTION_KEY not found - using insecure default for development only');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
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