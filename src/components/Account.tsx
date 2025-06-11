'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Wallet, 
  Coins, 
  Star, 
  TrendingUp, 
  Trophy, 
  Activity,
  Copy,
  ExternalLink,
  Zap,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { useAccount, useBalance, useEnsName } from 'wagmi';

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  icon: string;
  address: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const MOCK_TOKENS: TokenBalance[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '2.3456',
    value: 4691.12,
    icon: '⚡',
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '1,250.00',
    value: 1250.00,
    icon: '💵',
    address: '0xA0b86a33E6C934c58bF34b5E86C7B938c7E4e5f7'
  },
  {
    symbol: 'WHALE',
    name: 'Whale Token',
    balance: '5,000',
    value: 850.00,
    icon: '🐋',
    address: '0x9355372396e3F6daF13359B7b607a3374cc638e0'
  }
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-whale',
    title: 'First Whale Spotted',
    description: 'Correctly identified your first crypto whale',
    icon: '🐋',
    unlockedAt: '2024-01-15',
    rarity: 'common'
  },
  {
    id: 'perfect-game',
    title: 'Perfect Game',
    description: 'Scored 100% on a whale trivia game',
    icon: '💯',
    unlockedAt: '2024-02-03',
    rarity: 'rare'
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Won 10 games in a row',
    icon: '🔥',
    unlockedAt: '2024-02-18',
    rarity: 'epic'
  }
];

const MOCK_GAME_STATS = {
  totalGames: 127,
  gamesWon: 98,
  totalPoints: 47250,
  totalXP: 58320,
  level: 12,
  winRate: 77.2,
  avgScore: 85.4,
  bestStreak: 15,
  currentStreak: 3,
  playtime: '23.5',
  favoriteCategory: 'NFT Collecting',
  lastPlayed: '2 hours ago'
};

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    case 'rare': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
    case 'epic': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
    case 'legendary': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
  }
};

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'achievements' | 'stats'>('overview');
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const totalPortfolioValue = MOCK_TOKENS.reduce((sum, token) => sum + token.value, 0);

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-500">Connect your wallet to view your account details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'tokens', label: 'Tokens', icon: Coins },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'stats', label: 'Game Stats', icon: TrendingUp },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <User className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Account Dashboard
          </h1>
        </motion.div>
      </div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30 p-6"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl">
            🐋
          </div>
          
          {/* User Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              {ensName || 'Whale Hunter'}
            </h2>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
              <span className="text-gray-300 font-mono">{formatAddress(address!)}</span>
              <motion.button
                onClick={() => copyToClipboard(address!)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className={`w-4 h-4 ${copiedAddress ? 'text-green-400' : 'text-gray-400'}`} />
              </motion.button>
              <motion.a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-white/10 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </motion.a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center lg:text-left">
                <div className="text-xl font-bold text-yellow-400">{MOCK_GAME_STATS.level}</div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl font-bold text-green-400">{MOCK_GAME_STATS.totalPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Points</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl font-bold text-blue-400">{MOCK_GAME_STATS.winRate}%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl font-bold text-purple-400">{MOCK_ACHIEVEMENTS.length}</div>
                <div className="text-sm text-gray-400">Achievements</div>
              </div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="w-full lg:w-64">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Level {MOCK_GAME_STATS.level}</span>
              <span>{MOCK_GAME_STATS.totalXP.toLocaleString()} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(MOCK_GAME_STATS.totalXP % 5000) / 50}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {5000 - (MOCK_GAME_STATS.totalXP % 5000)} XP to level {MOCK_GAME_STATS.level + 1}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Overview */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Portfolio</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    ${totalPortfolioValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Value</div>
                </div>
                <div className="space-y-2">
                  {MOCK_TOKENS.slice(0, 3).map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{token.icon}</span>
                        <span className="text-white">{token.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{token.balance}</div>
                        <div className="text-sm text-gray-400">${token.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <div className="text-white text-sm">Won trivia game</div>
                    <div className="text-gray-400 text-xs">+750 points • 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Star className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <div className="text-white text-sm">Unlocked achievement</div>
                    <div className="text-gray-400 text-xs">Streak Master • 1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Zap className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <div className="text-white text-sm">Level up</div>
                    <div className="text-gray-400 text-xs">Reached level 12 • 3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TOKENS.map((token) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6 hover:border-purple-400/50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{token.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{token.symbol}</h3>
                    <p className="text-sm text-gray-400">{token.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-white">{token.balance}</div>
                    <div className="text-lg text-green-400">${token.value.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="font-mono">{token.address.slice(0, 10)}...</span>
                    <motion.button
                      onClick={() => copyToClipboard(token.address)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs border ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity.toUpperCase()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>Unlocked {achievement.unlockedAt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Game Performance */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Games</span>
                  <span className="text-white font-semibold">{MOCK_GAME_STATS.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Won</span>
                  <span className="text-green-400 font-semibold">{MOCK_GAME_STATS.gamesWon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="text-green-400 font-semibold">{MOCK_GAME_STATS.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Score</span>
                  <span className="text-yellow-400 font-semibold">{MOCK_GAME_STATS.avgScore}%</span>
                </div>
              </div>
            </div>

            {/* Streaks */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Streaks</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-yellow-400 font-semibold">{MOCK_GAME_STATS.currentStreak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="text-orange-400 font-semibold">{MOCK_GAME_STATS.bestStreak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Playtime</span>
                  <span className="text-purple-400 font-semibold">{MOCK_GAME_STATS.playtime}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Played</span>
                  <span className="text-gray-300 font-semibold">{MOCK_GAME_STATS.lastPlayed}</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Level</span>
                  <span className="text-purple-400 font-semibold">{MOCK_GAME_STATS.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total XP</span>
                  <span className="text-blue-400 font-semibold">{MOCK_GAME_STATS.totalXP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Points</span>
                  <span className="text-yellow-400 font-semibold">{MOCK_GAME_STATS.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Category</span>
                  <span className="text-gray-300 font-semibold">{MOCK_GAME_STATS.favoriteCategory}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}; 