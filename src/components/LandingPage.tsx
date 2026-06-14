import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, LogIn, Sparkles, Activity, Search, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';
import '../landing.css';

// Stable React-controlled Tech Card
const TechCard = ({ title, children, rotation, backContent }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`tech-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
      style={{ "--rotation": rotation } as any}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="tech-card-inner">
        <div className="tech-card-front">
          <h1>{title}</h1>
          <div className="tech-card-svg-wrapper">
            {children}
          </div>
        </div>
        <div className="tech-card-back">
          <div className="back-inner">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const { signIn } = useAuth();
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card-neo');

    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const features = [
    {
      title: "Food Scan",
      desc: "Just snap a photo of your food to see what's inside. It's fast and easy.",
      icon: Search,
      image: "/images/thali_scan_feature_1777460634059.png"
    },
    {
      title: "Health Score",
      desc: "Get a simple score to see how healthy your meals are today.",
      icon: Activity,
      image: "/images/health_score_feature_1777460693426.png"
    },
    {
      title: "Food Friend",
      desc: "A friendly chat to help you pick better meals and stay active.",
      icon: MessageSquare,
      image: "/images/ai_coach_feature_1777460664924.png"
    },
    {
      title: "Market Prices",
      desc: "Check local prices in your city to find the best fresh food.",
      icon: Sparkles,
      image: "/images/mandi_intel_feature_1777460721619.png"
    }
  ];

  return (
    <div className="landing-body">
      <div className="rgb-border"></div>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#fafafa] overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-indigo-100/40 to-emerald-100/40 blur-[120px] mix-blend-multiply" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-orange-100/40 to-sky-100/40 blur-[120px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm font-bold tracking-widest text-gray-500 uppercase mb-8"
          >
            Introducing SwasthBite
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[110px] font-black text-gray-900 leading-[0.95] tracking-tight mb-8"
          >
            Nutrition That <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">Understands You.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The easiest way to track your daily meals. Just snap a photo to see what is in your food, find local prices, and eat better every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={() => signIn()} className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black hover:scale-105 transition-all shadow-xl shadow-gray-900/20 w-full sm:w-auto">
              Get Started Free
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              See How It Works <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE SWASTHBITE EXPERIENCE */}
      <section id="features" className="landing-section bg-white py-32 px-6 md:px-20 lg:px-40 flex flex-col gap-40 overflow-hidden">

        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative">
          <div className="md:w-1/2" ref={featuresRef}>
            <div className="mb-4">
              <span className="text-[#3a6e00] font-bold text-xl tracking-wide uppercase">SwasthBite Snap</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Track Your Food<br />With Just a Snap
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Snap your meal for instant nutritional details and smart, AI-driven advice from Swastha AI.
            </p>
            <button onClick={() => signIn()} className="border-2 border-[#3a6e00] text-[#3a6e00] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3a6e00] hover:text-white transition-colors">
              Try Snap with a Photo
            </button>
          </div>
          <div className="md:w-1/2 relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#eef2f6] to-transparent rounded-[60px] transform -rotate-3 scale-105 -z-10" />

            {/* CSS Animated Phone Mockup */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] h-[580px] bg-white rounded-[50px] border-[14px] border-gray-900 shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>
              <img src="/images/thali_scan_feature_1777460634059.png" alt="App Mockup" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Nutrition Elements */}
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-10 top-20 text-6xl drop-shadow-2xl z-20">🥗</motion.div>
            <motion.div animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-5 bottom-32 text-6xl drop-shadow-2xl z-20">🥑</motion.div>

            {/* Floating Info Box */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, delay: 1, repeat: Infinity }}
              className="absolute -bottom-10 -left-20 bg-white p-6 rounded-3xl shadow-2xl max-w-xs border border-gray-100 z-30"
            >
              <div className="flex items-center gap-2 mb-2 text-[#3a6e00] font-black">
                <Sparkles size={16} /> Swastha AI
              </div>
              <p className="text-sm font-bold text-gray-800">
                Good protein! But white rice spikes glucose. Walk for 15 mins after this.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Feature 2: Diet & Workout */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="text-[#3a6e00]" />
              <span className="text-[#3a6e00] font-bold text-xl tracking-wide">Personalized Hub</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              AI-Powered<br />Diet & Workouts.
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Tailored Indian recipes and curated Youtube workouts (Yoga, Gym, Cardio) matching your health conditions and goals.
            </p>
            <button className="bg-[#1c5f49] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#124231] transition-colors">
              Explore Recommendations
            </button>
          </div>
          <div className="md:w-1/2 relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-l from-[#e2f1ec] to-transparent rounded-[60px] transform rotate-3 scale-105 -z-10" />

            {/* Floating UI Cards */}
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 relative z-10">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">🧘‍♀️</div>
              <h3 className="text-2xl font-black mb-2">Morning Yoga Flow</h3>
              <p className="text-gray-500 font-bold mb-4">15 mins • 120 kcal</p>
              <div className="w-full h-32 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-bold">Video Embed</div>
            </motion.div>

            <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-10 -bottom-10 w-64 bg-[#0d0d14] text-white rounded-[30px] p-6 shadow-2xl z-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">🍲</div>
                <div>
                  <p className="font-black">Satvik Thali</p>
                  <p className="text-xs text-gray-400 font-bold">Lunch Plan</p>
                </div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-emerald-500"></div></div>
            </motion.div>
          </div>
        </div>

        {/* Feature 3: Mandi */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2">
            <div className="mb-4">
              <span className="text-[#3a6e00] font-bold text-xl tracking-wide uppercase">SwasthBite Mandi</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Smart Shopping<br />Real-time Prices.
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Track live ingredient prices from your local Mandi. Know when to buy and how to save money on your healthy groceries.
            </p>
            <button className="border-2 border-[#3a6e00] text-[#3a6e00] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3a6e00] hover:text-white transition-colors">
              Check Mandi Rates
            </button>
          </div>
          <div className="md:w-1/2 relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff5eb] to-transparent rounded-[60px] transform -rotate-3 scale-105 -z-10" />

            {/* Floating UI Cards */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl">🌿</div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Price Low</span>
                </div>
              </div>
              <h4 className="text-2xl font-black">Moong Dal</h4>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-display text-[#3a6e00]">₹95</span>
                <span className="text-sm font-bold text-gray-400 mb-2 uppercase">/ kg</span>
              </div>
            </motion.div>

            <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-5 top-10 w-64 bg-red-50 border border-red-100 rounded-[30px] p-6 shadow-2xl z-20">
              <div className="flex justify-between items-start">
                <div className="text-red-900 font-black">Onion</div>
                <span className="text-[0.6rem] font-black text-red-500 uppercase tracking-widest">Price High</span>
              </div>
              <div className="mt-2 text-3xl font-display text-red-600">₹80 <span className="text-sm text-red-400">/ kg</span></div>
            </motion.div>
          </div>
        </div>

        {/* Feature 4: Rewards */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16">
          <div className="md:w-1/2">
            <div className="mb-4">
              <span className="text-[#3a6e00] font-bold text-xl tracking-wide uppercase">Gamified Health</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Get Rewarded<br />For Being Healthy.
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Earn coins for logging meals, completing workouts, and maintaining streaks. Redeem them for real coupons on Blinkit, Zepto, and BigBasket!
            </p>
            <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-orange-500/30">
              View Your Rewards
            </button>
          </div>
          <div className="md:w-1/2 relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-l from-[#fff0f5] to-transparent rounded-[60px] transform rotate-3 scale-105 -z-10" />

            <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="relative w-full max-w-sm">
              <div className="w-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] text-white p-8 rounded-[40px] shadow-2xl z-10 relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-[24px] flex items-center justify-center shadow-lg shadow-orange-500/20 text-3xl">👑</div>
                  <div>
                    <p className="text-5xl font-display leading-none text-yellow-400">2,450</p>
                    <p className="text-[0.6rem] font-black tracking-widest text-white/50 uppercase mt-1">SWASTHA COINS</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-lg">Zepto</p>
                      <p className="text-sm font-bold text-emerald-400">25% OFF Groceries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/50 font-bold uppercase">Cost</p>
                      <p className="text-xl font-display text-orange-400">500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Coins */}
              <motion.div animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -right-5 w-16 h-16 bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full border-4 border-yellow-200 shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center text-white font-black text-xl z-20">S</motion.div>
              <motion.div animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -bottom-5 -left-10 w-20 h-20 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full border-4 border-orange-200 shadow-[0_0_30px_rgba(249,115,22,0.6)] flex items-center justify-center text-white font-black text-3xl z-20">₹</motion.div>
            </motion.div>
          </div>
        </div>

        {/* Feature 5: Scroll Flow Pipeline */}
        <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col items-center max-w-4xl mx-auto">
          <div className="text-center mb-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              <Activity size={16} /> Data Flow Pipeline
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              How SwasthBite Works
            </h2>
            <p className="text-xl text-gray-500">Scroll down to see the entire SwasthBite ecosystem in action.</p>
          </div>

          <div className="relative w-full pb-32">
            {/* Curvy Timeline SVG */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[400px] hidden md:block -z-10 opacity-60">
              <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full stroke-indigo-400 dark:stroke-indigo-600" fill="none" strokeWidth="4">
                <motion.path
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  d="M 50 0 C 150 125, -50 375, 50 500 C 150 625, -50 875, 50 1000"
                  strokeDasharray="12 12"
                />
              </svg>
            </div>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between w-full mb-32 relative"
            >
              <div className="md:w-5/12 text-right md:pr-16 mb-8 md:mb-0 hidden md:block">
                <h3 className="text-4xl font-black mb-4">1. Snap Your Meal</h3>
                <p className="text-lg text-gray-500 font-bold">Just take a picture of your regional Indian food. Our AI instantly recognizes complex mixed meals.</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl shadow-xl shadow-emerald-500/20 z-10 hidden md:flex">📸</div>

              <div className="md:w-5/12 w-full md:pl-16">
                <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black shadow-lg">1</div>
                  <div className="md:hidden mb-6">
                    <h3 className="text-3xl font-black">Snap Meal</h3>
                    <p className="text-sm text-gray-500 font-bold">Take a picture of your food.</p>
                  </div>
                  <div className="w-full h-48 bg-gray-100 rounded-[20px] overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80" alt="Meal" />
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row-reverse items-center justify-between w-full mb-32 relative"
            >
              <div className="md:w-5/12 md:pl-16 mb-8 md:mb-0 hidden md:block">
                <h3 className="text-4xl font-black mb-4">2. Swastha AI Engine</h3>
                <p className="text-lg text-gray-500 font-bold">The neural network calculates precise macros, checks regional prices, and evaluates your health goals.</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-indigo-500 flex items-center justify-center text-xl shadow-xl shadow-indigo-500/20 z-10 hidden md:flex">🚀</div>

              <div className="md:w-5/12 w-full md:pr-16">
                <div className="bg-[#050508] p-8 rounded-[40px] shadow-2xl shadow-indigo-900/30 border border-indigo-500/20 text-white relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center font-black shadow-lg">2</div>
                  <div className="md:hidden mb-6">
                    <h3 className="text-3xl font-black">AI Engine</h3>
                    <p className="text-sm text-gray-400 font-bold">Neural processing active.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center animate-spin-slow text-indigo-400"><Activity size={20} /></div>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden"><motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-indigo-500"></motion.div></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center animate-pulse text-purple-400"><Search size={20} /></div>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden"><motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 2.5, repeat: Infinity }} className="h-full bg-purple-500"></motion.div></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between w-full mb-32 relative"
            >
              <div className="md:w-5/12 text-right md:pr-16 mb-8 md:mb-0 hidden md:block">
                <h3 className="text-4xl font-black mb-4">3. Diet Plan Generation</h3>
                <p className="text-lg text-gray-500 font-bold">Receive highly personalized daily meal plans featuring exact portions of regional ingredients.</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-sky-500 flex items-center justify-center text-xl shadow-xl shadow-sky-500/20 z-10 hidden md:flex">📋</div>

              <div className="md:w-5/12 w-full md:pl-16">
                <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center font-black shadow-lg">3</div>
                  <div className="md:hidden mb-6">
                    <h3 className="text-3xl font-black">Diet Plan</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                      <p className="font-black text-sky-900">Breakfast</p>
                      <p className="text-sm font-bold text-sky-700">Oats Idli & Sambhar</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <p className="font-black text-orange-900">Lunch</p>
                      <p className="text-sm font-bold text-orange-700">Ragi Roti & Dal Makhani</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row-reverse items-center justify-between w-full mb-32 relative"
            >
              <div className="md:w-5/12 md:pl-16 mb-8 md:mb-0 hidden md:block">
                <h3 className="text-4xl font-black mb-4">4. Smart Mandi Integration</h3>
                <p className="text-lg text-gray-500 font-bold">SwasthBite checks your local Mandi for the exact ingredients you need, highlighting price drops and trends.</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-emerald-600 flex items-center justify-center text-xl shadow-xl shadow-emerald-500/20 z-10 hidden md:flex">🛒</div>

              <div className="md:w-5/12 w-full md:pr-16">
                <div className="bg-emerald-50 p-8 rounded-[40px] shadow-2xl shadow-emerald-900/10 border border-emerald-200 relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black shadow-lg">4</div>
                  <div className="md:hidden mb-6">
                    <h3 className="text-3xl font-black">Mandi Check</h3>
                  </div>
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">🌿</div>
                      <div>
                        <p className="font-black text-sm">Moong Dal</p>
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Price Dropped</p>
                      </div>
                    </div>
                    <p className="font-display text-xl text-emerald-700">₹95</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between w-full relative"
            >
              <div className="md:w-5/12 text-right md:pr-16 mb-8 md:mb-0 hidden md:block">
                <h3 className="text-4xl font-black mb-4">5. Get Rewarded</h3>
                <p className="text-lg text-gray-500 font-bold">Hit your Aarogya Score, save money at the Mandi, and earn coins to redeem real-world grocery coupons.</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-orange-500 flex items-center justify-center text-xl shadow-xl shadow-orange-500/20 z-10 hidden md:flex">👑</div>

              <div className="md:w-5/12 w-full md:pl-16">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 rounded-[40px] shadow-2xl shadow-orange-500/30 text-white relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-orange-500 rounded-full flex items-center justify-center font-black shadow-lg">5</div>
                  <div className="md:hidden mb-6">
                    <h3 className="text-3xl font-black">Get Rewarded</h3>
                    <p className="text-sm text-white/80 font-bold">Earn coins and coupons.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-[0.6rem] font-black tracking-widest uppercase text-white/60">Aarogya Score</p>
                      <p className="text-5xl font-display mt-2">85<span className="text-2xl text-white/60">%</span></p>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.6rem] font-black tracking-widest uppercase text-white/60">Coins Earned</p>
                      <p className="text-5xl font-display mt-2">+50</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* SECTION 3: LOGIN */}
      {/* TECH STACK SECTION */}
      <section className="tech-stack-section">
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">The SwasthBite <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">Tech Stack</span></h2>
          <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto">Vedic wisdom meets state-of-the-art AI. Here's the intelligence powering your nutritional journey.</p>
        </div>

        <div className="cards-container">
          <TechCard
            title={<>Frontend <br />Engine</>}
            rotation="7deg"
            backContent={
              <>
                <p>I build <em>vibrant</em> and <em>responsive</em> interfaces using React 19 and Tailwind CSS.</p>
                <ul>
                  <li>React 19</li>
                  <li>Tailwind</li>
                  <li>GSAP</li>
                  <li>Three.js</li>
                  <li>Framer</li>
                </ul>
              </>
            }
          >
            <svg width="255" height="314" viewBox="0 0 255 314" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="57.8967" y="22.5154" width="14.4742" height="160.825" fill="#111111" />
              <rect x="101.319" y="22.5154" width="14.4742" height="131.876" fill="#111111" />
              <rect x="144.742" y="94.8867" width="14.4742" height="73.9794" fill="#111111" />
              <rect x="188.165" y="109.361" width="14.4742" height="73.9794" fill="#111111" />
              <rect x="231.588" y="138.309" width="14.4742" height="88.4536" fill="#111111" />
              <rect x="217.113" y="226.763" width="14.4742" height="41.8144" fill="#111111" />
              <rect x="202.639" y="268.577" width="14.4742" height="45.0309" fill="#111111" />
              <rect x="72.3711" y="284.66" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="57.8967" y="255.711" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="43.4227" y="226.763" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="28.9483" y="197.814" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="14.4744" y="168.866" width="14.4742" height="28.9484" fill="#111111" />
              <rect y="139.917" width="14.4742" height="43.4227" fill="#111111" />
              <rect x="43.4227" y="154.392" width="14.4742" height="14.4742" fill="#111111" />
              <rect x="14.4744" y="139.917" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="72.3711" y="8.04126" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="115.794" y="80.4124" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="159.217" y="94.8867" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="86.8455" y="299.134" width="115.794" height="14.4742" fill="#111111" />
              <rect x="202.639" y="109.361" width="14.4742" height="14.4742" fill="#111111" />
              <rect x="217.113" y="123.835" width="14.4742" height="14.4742" fill="#111111" />
              <path d="M14.4744 154.392H43.4229V168.866H57.8971V183.34H72.3713V22.5154H101.32V154.392H115.794V94.8865H144.742V168.866H159.217V109.361H188.165V183.34H202.639V123.835H217.114V138.309H231.588V226.763H217.114V268.577H202.639V299.134H86.8455V284.66H72.3713V255.711H57.8971V226.763H43.4229V197.814H28.9486V168.866H14.4744V154.392Z" fill="#111111" />
              <rect x="65.9391" y="14.4741" width="14.4742" height="160.825" fill="#111111" />
              <rect x="109.361" y="14.4741" width="14.4742" height="131.876" fill="#111111" />
              <rect x="152.784" y="86.8455" width="14.4742" height="73.9794" fill="#111111" />
              <rect x="196.207" y="101.32" width="14.4742" height="73.9794" fill="#111111" />
              <rect x="239.63" y="130.268" width="14.4742" height="88.4536" fill="#111111" />
              <rect x="225.155" y="218.722" width="14.4742" height="41.8144" fill="#111111" />
              <rect x="210.681" y="260.536" width="14.4742" height="45.0309" fill="#111111" />
              <rect x="80.4131" y="276.619" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="65.9391" y="247.67" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="51.4647" y="218.722" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="36.9903" y="189.773" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="22.5164" y="160.825" width="14.4742" height="28.9484" fill="#111111" />
              <rect x="8.04199" y="131.876" width="14.4742" height="43.4227" fill="#111111" />
              <rect x="51.4647" y="146.351" width="14.4742" height="14.4742" fill="#111111" />
              <rect x="22.5164" y="131.876" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="80.4131" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="123.836" y="72.3711" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="167.259" y="86.8455" width="28.9484" height="14.4742" fill="#111111" />
              <rect x="94.8875" y="291.093" width="115.794" height="14.4742" fill="#111111" />
              <rect x="210.681" y="101.32" width="14.4742" height="14.4742" fill="#111111" />
              <rect x="225.155" y="115.794" width="14.4742" height="14.4742" fill="#111111" />
              <path d="M22.5164 146.35H51.4649V160.825H65.9391V175.299H80.4133V14.4741H109.362V146.35H123.836V86.8452H152.784V160.825H167.259V101.319H196.207V175.299H210.681V115.794H225.156V130.268H239.63V218.721H225.156V260.536H210.681V291.093H94.8875V276.618H80.4133V247.67H65.9391V218.721H51.4649V189.773H36.9906V160.825H22.5164V146.35Z" fill="#E2FC91" />
            </svg>
          </TechCard>

          <TechCard
            title={<>Swastha <br />AI</>}
            rotation="-6deg"
            backContent={
              <>
                <p>Our "Swastha AI" coach uses Llama 3 for nutritional expertise and Gemini for high-accuracy food scanning.</p>
                <ul>
                  <li>Llama 3</li>
                  <li>Gemini 1.5</li>
                  <li>NLP</li>
                </ul>
              </>
            }
          >
            <svg viewBox="0 0 195 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="45" y="15" width="105" height="165" fill="#111111" />
              <rect x="30" y="30" width="135" height="135" fill="#111111" />
              <rect x="15" y="45" width="165" height="105" fill="#111111" />
              <rect y="75" width="195" height="45" fill="#111111" />
              <rect x="75" width="45" height="270" fill="#111111" />
              <rect x="60" y="165" width="75" height="90" fill="#111111" />
              <rect x="60" y="209" width="75" height="46" fill="#111111" />
              <path d="M60 45V30H90V15H105V30H135V45H150V60H165V90H180V105H165V135H150V150H135V165H120V194H75V165H60V150H45V135H30V105H15V90H30V60H45V45H60Z" fill="#E2FC91" />
              <rect x="75" y="135" width="15" height="90" fill="#111111" />
              <rect x="60" y="105" width="15" height="30" fill="#111111" />
              <rect x="120" y="105" width="15" height="30" fill="#111111" />
              <rect x="90" y="105" width="15" height="30" fill="#111111" />
              <rect x="75" y="90" width="15" height="15" fill="#111111" />
              <rect x="105" y="90" width="15" height="15" fill="#111111" />
              <rect x="105" y="135" width="15" height="90" fill="#111111" />
              <rect x="75" y="210" width="30" height="15" fill="#E2FC91" />
              <rect x="90" y="240" width="30" height="15" fill="#E2FC91" />
            </svg>
          </TechCard>

          <TechCard
            title={<>The <br />Backend</>}
            rotation="4deg"
            backContent={
              <>
                <p>Custom dataset of 80+ Indian dishes integrated with real-time Agmarknet mandi price data</p>
                <ul>
                  <li>FastAPI</li>
                  <li>Firebase</li>
                  <li>Agmarknet</li>
                  <li>Python</li>
                </ul>
              </>
            }
          >
            <svg viewBox="0 0 329 195" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="110.85" y="15" width="105" height="165" fill="#111111" />
              <rect x="95.8499" y="30" width="135" height="135" fill="#111111" />
              <rect x="80.8499" y="45" width="165" height="105" fill="#111111" />
              <rect x="65.8499" y="75" width="195" height="45" fill="#111111" />
              <rect x="140.85" width="45" height="195" fill="#111111" />
              <path d="M125.85 45V30H155.85V15H170.85V30H200.85V45H215.85V60H230.85V90H245.85V105H230.85V135H215.85V150H200.85V165H170.85V180H155.85V165H125.85V150H110.85V135H95.8499V105H80.8499V90H95.8499V60H110.85V45H125.85Z" fill="#E2FC91" />
              <rect x="44.0559" y="88.0706" width="30" height="15" transform="rotate(-11.7568 44.0559 88.0706)" fill="#111111" />
              <rect x="30.7969" y="97.9802" width="15" height="15" transform="rotate(-11.7568 30.7969 97.9802)" fill="#111111" />
              <rect x="17.7417" y="108.869" width="15" height="15" transform="rotate(-11.7568 17.7417 108.869)" fill="#111111" />
              <rect x="282.405" y="45.6143" width="15" height="15" transform="rotate(-11.7568 282.405 45.6143)" fill="#111111" />
              <rect x="234.965" y="48.3376" width="47" height="15" transform="rotate(-11.7568 234.965 48.3376)" fill="#111111" />
              <rect x="20.7981" y="123.554" width="15" height="30" transform="rotate(-11.7568 20.7981 123.554)" fill="#111111" />
              <rect x="286.888" y="67.1526" width="15" height="30" transform="rotate(-11.7568 286.888 67.1526)" fill="#111111" />
              <rect x="38.5398" y="135.183" width="15" height="30" transform="rotate(-11.7568 38.5398 135.183)" fill="#111111" />
              <rect x="275.463" y="85.8733" width="15" height="30" transform="rotate(-11.7568 275.463 85.8733)" fill="#111111" />
              <rect x="56.2815" y="146.812" width="30" height="15" transform="rotate(-11.7568 56.2815 146.812)" fill="#111111" />
              <rect x="249.149" y="106.671" width="30" height="15" transform="rotate(-11.7568 249.149 106.671)" fill="#111111" />
              <rect x="4.4827" y="118.778" width="15" height="15" transform="rotate(-11.7568 4.4827 118.778)" fill="#111111" />
              <rect x="4.4827" y="118.778" width="15" height="30" transform="rotate(-11.7568 4.4827 118.778)" fill="#111111" />
              <rect x="298.517" y="49.4109" width="15" height="30" transform="rotate(-11.7568 298.517 49.4109)" fill="#111111" />
              <rect x="74.0232" y="158.441" width="197" height="15" transform="rotate(-11.7568 74.0232 158.441)" fill="#111111" />
            </svg>
          </TechCard>
        </div>
      </section>

      <section className="landing-section bg-[#dcdfe6] p-10">
        <div className="login-card-neo neo-card p-12 bg-white/10 backdrop-blur-3xl rounded-[50px] border border-white/20 rgb-shadow">
          <h2 className="font-display text-6xl uppercase leading-none">Ready for<br />A Change?</h2>
          <p className="hero-tagline mt-6">Join thousands of people who are eating better using their own food traditions.</p>
          <button
            onClick={() => signIn()}
            className="bg-[#3a6e00] text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] w-full mt-8 shadow-2xl shadow-[#3a6e00]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
        <div className="mt-20 opacity-30 text-[0.6rem] font-bold tracking-[0.5em] uppercase">
          Digital Satvik Platform © 2026
        </div>
      </section>
    </div>
  );
}
