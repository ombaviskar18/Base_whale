'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  TrendingUp, 
  Shield, 
  Bell, 
  Users,
  BarChart3,
  Target,
  Sparkles
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "Free",
      period: "",
      description: "Perfect for getting started with whale tracking",
      popular: false,
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-500/10 to-gray-600/10",
      borderColor: "border-gray-400/30",
      features: [
        { text: "Track up to 5 whales", icon: Target },
        { text: "Real-time insights", icon: TrendingUp },
        { text: "3 alert types", icon: Bell },
        { text: "Basic whale profiles", icon: Users },
        { text: "Community support", icon: Shield }
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
    },
    {
      name: "Pro Plan",
      price: "$49",
      period: "/month",
      description: "Advanced features for serious whale hunters",
      popular: true,
      gradient: "from-purple-500 to-blue-500",
      bgGradient: "from-purple-500/20 to-blue-500/20",
      borderColor: "border-purple-400/50",
      features: [
        { text: "Track unlimited whales", icon: Target },
        { text: "Advanced market analytics", icon: BarChart3 },
        { text: "Priority alerts & notifications", icon: Bell },
        { text: "Detailed wallet profiling", icon: Users },
        { text: "AI-powered insights", icon: Sparkles },
        { text: "Custom alert thresholds", icon: Zap },
        { text: "Historical data access", icon: TrendingUp },
        { text: "Priority support", icon: Shield }
      ],
      buttonText: "Upgrade to Pro",
      buttonStyle: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For big whales and institutional traders",
      popular: false,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-400/50",
      features: [
        { text: "Everything in Pro", icon: Crown },
        { text: "Multi-chain whale tracking", icon: Target },
        { text: "Real-time API access", icon: Zap },
        { text: "Custom integrations", icon: BarChart3 },
        { text: "Dedicated account manager", icon: Users },
        { text: "White-label solutions", icon: Sparkles },
        { text: "Advanced security features", icon: Shield },
        { text: "24/7 premium support", icon: Bell },
        { text: "Custom reporting", icon: TrendingUp }
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From casual whale watching to professional trading insights, 
            we have the perfect plan to elevate your crypto game
          </p>
        </motion.div>

        {/* Whale Animation */}
        <motion.div
          className="flex justify-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="text-4xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2 + i * 0.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              🐋
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative backdrop-blur-xl bg-white/5 rounded-2xl border ${plan.borderColor} p-8 ${
              plan.popular ? 'scale-105 shadow-2xl' : ''
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-400 text-lg">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <feature.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${plan.buttonStyle}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.buttonText}
            </motion.button>

            {/* Background Decoration */}
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} rounded-2xl opacity-50 -z-10`} />
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">🎯 Why Choose Whale Hunter?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl">⚡</div>
              <h4 className="font-semibold text-white">Real-time Tracking</h4>
              <p className="text-gray-400 text-sm">Get instant notifications when whales make moves</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🧠</div>
              <h4 className="font-semibold text-white">AI-Powered Insights</h4>
              <p className="text-gray-400 text-sm">Advanced analytics to predict market movements</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🔒</div>
              <h4 className="font-semibold text-white">Secure & Private</h4>
              <p className="text-gray-400 text-sm">Your data is encrypted and never shared</p>
            </div>
          </div>
        </div>

        <p className="text-gray-400">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </motion.div>
    </div>
  );
}; 