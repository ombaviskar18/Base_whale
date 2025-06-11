'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { 
  Home, 
  Trophy, 
  Gift, 
  User, 
  Wallet, 
  Menu, 
  X, 
  Settings,
  LogOut,
  Coins,
  Star,
  TrendingUp
} from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'leaderboard' | 'rewards' | 'account';
  onPageChange: (page: 'home' | 'leaderboard' | 'rewards' | 'account') => void;
  userPoints?: number;
  userXP?: number;
  userLevel?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onPageChange, 
  userPoints = 0, 
  userXP = 0, 
  userLevel = 1 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'account', label: 'Account', icon: User },
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: any) => {
    if (!bal) return '0.00';
    return parseFloat(bal.formatted).toFixed(4);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🐋</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Whale Hunter
            </h1>
            <p className="text-xs text-gray-400">XMTP Powered</p>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* User Stats & Wallet */}
        <div className="flex items-center space-x-4">
          {/* User Stats */}
          {isConnected && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">{userPoints.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <Star className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-semibold">XP: {userXP.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 rounded-lg border border-green-400/30">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">Lv. {userLevel}</span>
              </div>
            </div>
          )}

          {/* Wallet Connection */}
          <div className="relative">
            {isConnected ? (
              <motion.button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 bg-green-500/20 rounded-lg border border-green-400/30 text-green-400"
                whileHover={{ scale: 1.05 }}
              >
                <Wallet className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{formatAddress(address!)}</div>
                  <div className="text-xs text-green-300">
                    {formatBalance(balance)} ETH
                  </div>
                </div>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => open()}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </motion.button>
            )}

            {/* Account Dropdown */}
            <AnimatePresence>
              {isAccountDropdownOpen && isConnected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-64 backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 p-4 z-50"
                >
                  <div className="space-y-3">
                    <div className="text-sm text-gray-300">
                      <div className="font-semibold text-white mb-2">Account Details</div>
                      <div className="space-y-1">
                        <div>Address: {formatAddress(address!)}</div>
                        <div>Balance: {formatBalance(balance)} ETH</div>
                        <div>Network: Ethereum</div>
                      </div>
                    </div>
                    
                    <hr className="border-white/20" />
                    
                    <div className="space-y-2">
                      <button 
                        className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                        onClick={() => {
                          onPageChange('account');
                          setIsAccountDropdownOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                      
                      <button 
                        className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                        onClick={() => {
                          disconnect();
                          setIsAccountDropdownOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-3 backdrop-blur-xl bg-white/5 border-b border-white/10">
        {/* Mobile Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-lg">🐋</span>
          </div>
          <span className="font-bold text-white">Whale Hunter</span>
        </div>

        {/* Mobile Stats */}
        {isConnected && (
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 rounded border border-yellow-400/30">
              <Coins className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">{userPoints > 999 ? `${(userPoints/1000).toFixed(1)}k` : userPoints}</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 rounded border border-blue-400/30">
              <Star className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">{userXP > 999 ? `${(userXP/1000).toFixed(1)}k` : userXP}</span>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white"
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden backdrop-blur-xl bg-white/5 border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              ))}

              <hr className="border-white/20 my-4" />

              {/* Wallet Section */}
              {isConnected ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-green-500/20 rounded-lg border border-green-400/30">
                    <div className="text-green-400 font-semibold text-sm">
                      {formatAddress(address!)}
                    </div>
                    <div className="text-green-300 text-xs">
                      {formatBalance(balance)} ETH
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={() => {
                    open();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdown */}
      {isAccountDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsAccountDropdownOpen(false)}
        />
      )}
    </>
  );
}; 