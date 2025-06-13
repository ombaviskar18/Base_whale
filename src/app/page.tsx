'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MCQGame } from '../components/MCQGame';
import { Leaderboard } from '../components/Leaderboard';
import { Rewards } from '../components/Rewards';
import { Footer } from '../components/Footer';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for Account component to avoid SSR issues
const Account = dynamic(
  () => import('../components/Account').then((mod) => ({ default: mod.Account })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    )
  }
);

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'leaderboard' | 'rewards' | 'account'>('home');
  const [userPoints, setUserPoints] = useState(15000);
  const [userXP, setUserXP] = useState(23500);
  const [userLevel, setUserLevel] = useState(7);
  const [mounted, setMounted] = useState(false);
  
  const { isConnected } = useAccount();

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  const handlePointsEarned = (points: number) => {
    setUserPoints(prev => prev + points);
    setUserXP(prev => prev + points * 1.2);
    
    // Level up logic
    const newLevel = Math.floor((userXP + points * 1.2) / 5000) + 1;
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="container mx-auto p-6">
            {!isConnected ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-6xl mb-6">🐋</div>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                    Whale Hunter
                  </h1>
                  <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    The ultimate XMTP-powered crypto whale trivia game. 
                    Test your knowledge, earn rewards, and climb the leaderboard!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
                      <div className="text-3xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold text-white mb-2">Real-time Trivia</h3>
                      <p className="text-gray-400">Answer questions about crypto whales and their on-chain activities</p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
                      <div className="text-3xl mb-4">💬</div>
                      <h3 className="text-xl font-semibold text-white mb-2">XMTP Integration</h3>
                      <p className="text-gray-400">Get real-time whale alerts and chat with other hunters</p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
                      <div className="text-3xl mb-4">🏆</div>
                      <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
                      <p className="text-gray-400">Claim NFTs, tokens, and exclusive perks with your points</p>
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg border border-orange-400/30">
                      <span>⚠️</span>
                      <span className="font-semibold">Connect your wallet to start playing!</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-8">
                <MCQGame onPointsEarned={handlePointsEarned} />
                
                {/* XMTP Integration CTA */}
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-8 text-center">
                  <div className="text-6xl mb-4">🐳</div>
                  <h2 className="text-3xl font-bold text-white mb-4">Ready for Advanced Whale Hunting?</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Experience the full power of XMTP messaging, AI-powered trivia, and real-time whale detection 
                    in our advanced gaming environment!
                  </p>
                  
                  <button 
                    onClick={() => window.open('/xmtp', '_blank')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🚀 Launch XMTP Whale Hunter
                  </button>
                  <p className="text-sm text-gray-400 mt-3">Opens in new tab • Includes DetectWhale game, XMTP chat & live alerts</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'rewards':
        return <Rewards userPoints={userPoints} userLevel={userLevel} />;
      case 'account':
        return <Account />;
      default:
        return <MCQGame onPointsEarned={handlePointsEarned} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default function Home() {
  return <MainApp />;
}
