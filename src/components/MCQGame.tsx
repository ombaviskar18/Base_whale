'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  Trophy, 
  Target, 
  Coins,
  AlertCircle,
  CheckCircle,
  X,
  Lightbulb,
  Zap,
  PlayCircle
} from 'lucide-react';
import { getProgressiveQuestions, MCQQuestion } from '../lib/questionDatabase';
import { useAccount } from 'wagmi';

interface WhaleAlert {
  id: string;
  whale: string;
  action: string;
  amount: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
}

interface MCQGameProps {
  onPointsEarned?: (points: number) => void;
}

export const MCQGame: React.FC<MCQGameProps> = ({ onPointsEarned }) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'paused' | 'finished'>('waiting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    totalPoints: 0,
    accuracy: 0
  });

  const { isConnected } = useAccount();

  // Mock whale alerts
  const [whaleAlerts, setWhaleAlerts] = useState<WhaleAlert[]>([
    {
      id: '1',
      whale: 'Vitalik.eth',
      action: 'Transferred 1,000 ETH',
      amount: '$2.3M',
      severity: 'critical',
      timestamp: '2 min ago'
    },
    {
      id: '2', 
      whale: 'Punk6529',
      action: 'Bought CryptoPunk #7804',
      amount: '$850K',
      severity: 'high',
      timestamp: '5 min ago'
    },
    {
      id: '3',
      whale: 'WhaleShark',
      action: 'Staked 500K WHALE tokens',
      amount: '$125K',
      severity: 'medium', 
      timestamp: '12 min ago'
    }
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    // Add new whale alerts periodically
    const interval = setInterval(() => {
      const newAlert: WhaleAlert = {
        id: Date.now().toString(),
        whale: ['Beanie.eth', 'Pranksy.eth', 'GCR', 'Ansem'][Math.floor(Math.random() * 4)],
        action: ['Large ETH transfer', 'NFT purchase', 'DeFi interaction', 'Token swap'][Math.floor(Math.random() * 4)],
        amount: `$${Math.floor(Math.random() * 500 + 50)}K`,
        severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as WhaleAlert['severity'],
        timestamp: 'Just now'
      };
      
      setWhaleAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    if (!isConnected) return;
    
    const newQuestions = getProgressiveQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setHintsUsed(0);
    setGameState('playing');
    setTimeLeft(newQuestions[0]?.timeLimit || 60);
    setGameStats({
      totalQuestions: newQuestions.length,
      correctAnswers: 0,
      totalPoints: 0,
      accuracy: 0
    });
  };

  const handleAnswer = (answer: string) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    setIsSubmitted(true);
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    let pointsEarned = 0;
    
    if (isCorrect) {
      // Calculate points based on time left, hints used, and question difficulty
      const timeBonus = Math.floor((timeLeft / currentQuestion.timeLimit) * 100);
      const hintPenalty = hintsUsed * 10;
      pointsEarned = Math.max(50, currentQuestion.points + timeBonus - hintPenalty);
      
      setScore(prev => prev + pointsEarned);
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalPoints: prev.totalPoints + pointsEarned,
        accuracy: ((prev.correctAnswers + 1) / (currentQuestionIndex + 1)) * 100
      }));
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        nextQuestion();
      } else {
        finishGame();
      }
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer('');
    setIsSubmitted(false);
    setHintsUsed(0);
    setShowHint(false);
    setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 60);
  };

  const handleTimeUp = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          nextQuestion();
        } else {
          finishGame();
        }
      }, 2000);
    }
  };

  const finishGame = () => {
    setGameState('finished');
    if (onPointsEarned) {
      onPointsEarned(gameStats.totalPoints);
    }
  };

  const showNextHint = () => {
    if (hintsUsed < 3 && currentQuestion) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsSubmitted(false);
    setScore(0);
    setTimeLeft(60);
    setHintsUsed(0);
    setShowHint(false);
  };

  const getSeverityColor = (severity: WhaleAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'border-red-400/50 bg-red-500/10 text-red-300';
      case 'high': return 'border-orange-400/50 bg-orange-500/10 text-orange-300';
      case 'medium': return 'border-yellow-400/50 bg-yellow-500/10 text-yellow-300';
      case 'low': return 'border-blue-400/50 bg-blue-500/10 text-blue-300';
    }
  };

  const getHint = () => {
    if (!currentQuestion) return '';
    if (hintsUsed === 1) return currentQuestion.hint1;
    if (hintsUsed === 2) return currentQuestion.hint2;
    if (hintsUsed === 3) return currentQuestion.hint3;
    return '';
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Required</h2>
          <p className="text-gray-400">Please connect your wallet to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🐋 Whale Hunter Trivia
        </motion.h1>
        <p className="text-gray-400 text-lg">
          Test your knowledge of crypto whales and earn points!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-2 space-y-6">
          {gameState === 'waiting' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30 p-8 text-center"
            >
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Hunt Whales?</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Answer {getProgressiveQuestions().length} questions about crypto whales and their activities
              </p>
              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto hover:from-purple-600 hover:to-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle className="w-6 h-6" />
                <span>Start Game</span>
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && currentQuestion && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{score} pts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-semibold">{timeLeft}s</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm border ${
                        currentQuestion.difficulty === 'easy' ? 'text-green-400 bg-green-500/20 border-green-400/30' :
                        currentQuestion.difficulty === 'medium' ? 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30' :
                        'text-red-400 bg-red-500/20 border-red-400/30'
                      }`}>
                        {currentQuestion.difficulty.toUpperCase()}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {currentQuestion.category.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {currentQuestion.question}
                    </h3>
                  </div>
                  <div className="text-2xl ml-4">{currentQuestion.points} pts</div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option.split(')')[0])}
                      disabled={isSubmitted}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        selectedAnswer === option.split(')')[0]
                          ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                      } ${
                        isSubmitted && option.split(')')[0] === currentQuestion.correctAnswer
                          ? 'border-green-400 bg-green-500/20 text-green-300'
                          : isSubmitted && selectedAnswer === option.split(')')[0] && selectedAnswer !== currentQuestion.correctAnswer
                          ? 'border-red-400 bg-red-500/20 text-red-300'
                          : ''
                      }`}
                      whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                    >
                      <span className="font-semibold">{option}</span>
                      {isSubmitted && option.split(')')[0] === currentQuestion.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-400 float-right mt-0.5" />
                      )}
                      {isSubmitted && selectedAnswer === option.split(')')[0] && selectedAnswer !== currentQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-red-400 float-right mt-0.5" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Hint Section */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-4"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Hint {hintsUsed}</span>
                      </div>
                      <p className="text-gray-300">{getHint()}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={showNextHint}
                    disabled={hintsUsed >= 3 || isSubmitted}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      hintsUsed >= 3 || isSubmitted
                        ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30'
                    }`}
                    whileHover={hintsUsed < 3 && !isSubmitted ? { scale: 1.05 } : {}}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Hint ({3 - hintsUsed} left)</span>
                  </motion.button>

                  <motion.button
                    onClick={submitAnswer}
                    disabled={!selectedAnswer || isSubmitted}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                      !selectedAnswer || isSubmitted
                        ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    }`}
                    whileHover={selectedAnswer && !isSubmitted ? { scale: 1.05 } : {}}
                    whileTap={selectedAnswer && !isSubmitted ? { scale: 0.95 } : {}}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}

          {gameState === 'finished' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30 p-8 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{gameStats.totalPoints}</div>
                  <div className="text-sm text-gray-400">Total Points</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{gameStats.correctAnswers}/{gameStats.totalQuestions}</div>
                  <div className="text-sm text-gray-400">Correct</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{gameStats.accuracy.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">#{Math.floor(Math.random() * 50) + 1}</div>
                  <div className="text-sm text-gray-400">Rank</div>
                </div>
              </div>

              <motion.button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto hover:from-purple-600 hover:to-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle className="w-5 h-5" />
                <span>Play Again</span>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Whale Alerts Panel */}
        <div className="space-y-6">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Live Whale Alerts</h3>
            </div>
            <div className="space-y-3">
              {whaleAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="font-semibold text-sm">{alert.whale}</div>
                  <div className="text-xs opacity-75">{alert.action}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold">{alert.amount}</span>
                    <span className="text-xs opacity-60">{alert.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* XMTP Chat Simulation */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">XMTP Chat</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="bg-blue-500/10 p-3 rounded-lg border-l-4 border-blue-400">
                <div className="text-blue-400 text-sm font-semibold">WhaleBot</div>
                <div className="text-gray-300 text-sm">New whale alert: Vitalik just moved 1,000 ETH!</div>
                <div className="text-xs text-gray-400 mt-1">2 min ago</div>
              </div>
              
              <div className="bg-purple-500/10 p-3 rounded-lg border-l-4 border-purple-400">
                <div className="text-purple-400 text-sm font-semibold">CryptoHunter</div>
                <div className="text-gray-300 text-sm">Anyone else seeing these massive NFT buys today?</div>
                <div className="text-xs text-gray-400 mt-1">5 min ago</div>
              </div>
              
              <div className="bg-green-500/10 p-3 rounded-lg border-l-4 border-green-400">
                <div className="text-green-400 text-sm font-semibold">WhaleWatcher</div>
                <div className="text-gray-300 text-sm">This trivia game is getting competitive! 🐋</div>
                <div className="text-xs text-gray-400 mt-1">8 min ago</div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 