'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Activity,
  AlertTriangle,
  Wifi
} from 'lucide-react';

// Dynamically import components to avoid SSR issues
const XMTPGameChatDynamic = dynamic(
  () => import('../../components/XMTPGameChat').then((mod) => ({ default: mod.XMTPGameChat })),
  { 
    ssr: false,
    loading: () => (
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Enhanced Whale Hunter Bot...</p>
      </div>
    )
  }
);

const DetectWhaleGameDynamic = dynamic(
  () => import('../../components/DetectWhaleGame').then((mod) => ({ default: mod.DetectWhaleGame })),
  { 
    ssr: false,
    loading: () => (
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Whale Detection Game...</p>
      </div>
    )
  }
);

interface UserStats {
  score: number;
  xp: number;
  level: number;
  completedThemes: number;
}

interface ServiceStats {
  botAddress: string;
  activeSessions: number;
}

interface WhaleAlert {
  id: string;
  whale: string;
  action: string;
  amount: string;
  time: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export default function XMTPPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [userStats, setUserStats] = useState<UserStats>({
    score: 2847,
    xp: 15420,
    level: 8,
    completedThemes: 4
  });
  
  const [serviceStats, setServiceStats] = useState<ServiceStats>({
    botAddress: ' 0x742d35C...329980A44D7F',
    activeSessions: 23
  });

  const [recentWhaleAlerts, setRecentWhaleAlerts] = useState<WhaleAlert[]>([
    {
      id: '1',
      whale: 'Vitalik Buterin',
      action: 'Donated 200 ETH to Gitcoin matching fund',
      amount: '200 ETH ($482,000)',
      time: '2 min ago',
      severity: 'high'
    },
    {
      id: '2', 
      whale: 'Punk6529',
      action: 'Acquired rare CryptoPunk #1543',
      amount: '85 ETH ($205,400)',
      time: '8 min ago',
      severity: 'medium'
    },
    {
      id: '3',
      whale: 'Institutional Wallet',
      action: 'Transferred to Coinbase custody',
      amount: '1,500 ETH ($3.6M)',
      time: '15 min ago',
      severity: 'critical'
    },
    {
      id: '4',
      whale: 'WhaleShark',
      action: 'Added rare Art Blocks to $WHALE vault',
      amount: '12 NFTs ($180,000)',
      time: '23 min ago',
      severity: 'medium'
    },
    {
      id: '5',
      whale: 'DeFi Protocol Whale',
      action: 'Unstaked from Ethereum 2.0',
      amount: '320 ETH ($772,800)',
      time: '31 min ago',
      severity: 'high'
    }
  ]);

  // Fix hydration by ensuring client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update user stats when game score changes
  useEffect(() => {
    if (mounted) {
      setUserStats(prev => ({
        ...prev,
        score: prev.score + gameScore,
        xp: prev.xp + (gameScore * 2)
      }));
    }
  }, [gameScore, mounted]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600/20 border-red-400/30 text-red-300';
      case 'high': return 'bg-orange-600/20 border-orange-400/30 text-orange-300';
      case 'medium': return 'bg-yellow-600/20 border-yellow-400/30 text-yellow-300';
      default: return 'bg-blue-600/20 border-blue-400/30 text-blue-300';
    }
  };

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading XMTP Whale Hunter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🔗</div>
            <h1 className="text-4xl font-bold text-white mb-4">Connect Wallet Required</h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Connect your wallet to access the XMTP Whale Hunter experience with live chat, 
              trivia games, and real-time whale detection.
            </p>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">XMTP Whale Hunter</h1>
                <p className="text-gray-400">Real-time whale detection & trivia gaming</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Live Monitoring</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">
                  Score: {userStats.score} | XP: {userStats.xp} | Lv. {userStats.level}
                </div>
                <div className="text-gray-400 text-sm">
                  Themes: {userStats.completedThemes}/6 | Sessions: {serviceStats.activeSessions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden space-y-6">
          
          {/* XMTP Chat - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="h-80 sm:h-96">
              <XMTPGameChatDynamic />
            </div>
          </motion.div>

          {/* DetectWhale Game - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
          >
            <div className="h-80">
              <DetectWhaleGameDynamic onScoreUpdate={setGameScore} />
            </div>
          </motion.div>

          {/* Service Status & Alerts - Full width stacked on mobile */}
          <div className="w-full space-y-4">
            
            {/* Service Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-white/20 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>Service Status</span>
                </h3>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">XMTP Service</span>
                  <span className="text-green-400 font-medium text-sm">Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Bot Address</span>
                  <span className="text-white text-xs truncate max-w-32">{serviceStats.botAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Active Sessions</span>
                  <span className="text-white font-medium text-sm">{serviceStats.activeSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Whale Monitoring</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs">Active</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Whale Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-white/20 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span>Live Alerts</span>
                </h3>
                <div className="text-xs text-gray-400">Real-time</div>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                {recentWhaleAlerts.slice(0, 4).map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="font-medium text-xs">{alert.whale}</div>
                    <div className="text-xs opacity-80 mt-1">{alert.action}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs">{alert.amount}</span>
                      <span className="text-xs opacity-60">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Desktop Layout - 3 column grid */}
        <div className="hidden lg:grid grid-cols-12 gap-6 min-h-[calc(100vh-200px)]">
          
          {/* Left Sidebar - DetectWhale Game */}
          <div className="col-span-3 h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <DetectWhaleGameDynamic onScoreUpdate={setGameScore} />
            </motion.div>
          </div>

          {/* Center - XMTP Chat */}
          <div className="col-span-6 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <XMTPGameChatDynamic />
            </motion.div>
          </div>

          {/* Right Sidebar - Service Status & Alerts */}
          <div className="col-span-3 h-full overflow-y-auto scrollbar-enhanced">
            <div className="space-y-6 h-full">
              
              {/* Service Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-white/20 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span>Service Status</span>
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Wifi className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">XMTP Service</span>
                    <span className="text-green-400 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Bot Address</span>
                    <span className="text-white text-sm">{serviceStats.botAddress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Active Sessions</span>
                    <span className="text-white font-medium">{serviceStats.activeSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Whale Monitoring</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Live Whale Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-white/20 p-4 flex-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <span>Live Alerts</span>
                  </h3>
                  <div className="text-xs text-gray-400">Real-time</div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
                  {recentWhaleAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                    >
                      <div className="font-medium text-sm">{alert.whale}</div>
                      <div className="text-xs opacity-80 mt-1">{alert.action}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm">{alert.amount}</span>
                        <span className="text-xs opacity-60">{alert.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gray-800/30 backdrop-blur-xl border-t border-white/20 py-8 sm:py-12 lg:py-16 mt-20 sm:mt-32 lg:mt-40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              🚀 Coming Soon
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Exciting new features are on the horizon! Get ready for the next evolution of whale hunting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Custom AI Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl border border-white/20 p-4 sm:p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Custom AI Agents</h3>
              <p className="text-gray-400 text-sm mb-3 sm:mb-4">
                Create multiple AI agents using simple prompts and launch them with XMTP integration. 
                Build your own whale hunting bots with custom personalities and strategies.
              </p>
              <div className="flex items-center space-x-2 text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">In Development</span>
              </div>
            </motion.div>

            {/* NFT Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-gradient-to-br from-pink-600/20 to-orange-600/20 backdrop-blur-xl rounded-xl border border-white/20 p-4 sm:p-6 hover:border-pink-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">NFT Marketplace</h3>
              <p className="text-gray-400 text-sm mb-3 sm:mb-4">
                Guess whales correctly, earn points, and claim exclusive NFTs! Trade your whale hunter 
                achievements in our dedicated marketplace with other players.
              </p>
              <div className="flex items-center space-x-2 text-pink-400">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Coming Q2 2024</span>
              </div>
            </motion.div>

            {/* Tournament System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl rounded-xl border border-white/20 p-4 sm:p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Tournament System</h3>
              <p className="text-gray-400 text-sm mb-3 sm:mb-4">
                Game creators can host tournaments where players compete in group chats. 
                Winners share prize pools and earn exclusive rewards and recognition.
              </p>
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Beta Testing</span>
              </div>
            </motion.div>

            {/* Whale Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-gradient-to-br from-yellow-600/20 to-red-600/20 backdrop-blur-xl rounded-xl border border-white/20 p-4 sm:p-6 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Whale Reports</h3>
              <p className="text-gray-400 text-sm mb-3 sm:mb-4">
                Create and sell comprehensive whale analysis reports. Share your trading strategies, 
                technical analysis, and market insights to help new traders succeed.
              </p>
              <div className="flex items-center space-x-2 text-yellow-400">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Research Phase</span>
              </div>
            </motion.div>

          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            {/* <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl border border-white/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                🔔 Stay Updated
              </h3>
              <p className="text-gray-400 mb-6">
                Be the first to know when these exciting features launch! Join our community for exclusive updates and early access.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Join Discord
                </button>
                <button className="bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Follow Updates
                </button>
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl" />
      </div>
    </div>
  );
} 
