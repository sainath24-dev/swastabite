import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Zap, 
  Target, 
  Droplets, 
  Leaf, 
  Search,
  Scan,
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  Check,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { scanFoodImage } from '../../services/aiService';
import { FOOD_DATABASE, FoodItem } from '../../data/foodDatabase';
import { cn } from '../../lib/utils';

export default function HomeSubpage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { profile, mealLogs, aarogyaScore, addMealLog, stats } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [detectedDishes, setDetectedDishes] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFoods = FOOD_DATABASE.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const handleQuickAdd = async (food: FoodItem) => {
     await addMealLog({
       name_en: food.name,
       calories_kcal: food.calories,
       protein_g: food.protein,
       fibre_g: food.fiber,
       is_fasting_approved: food.isSatvik
     });
     setSearchQuery('');
  };

  const homeStats = [
    { label: 'CALORIES', val: stats.totalCalories, target: profile?.calorie_target || 2100, icon: Zap, grad: 'from-orange-500 to-red-500', color: 'text-orange-500' },
    { label: 'PROTEIN', val: stats.totalProtein, target: profile?.protein_target || 80, icon: Target, grad: 'from-blue-500 to-indigo-600', color: 'text-indigo-500' },
    { label: 'FIBRE', val: stats.totalFibre, target: 25, icon: TrendingUp, grad: 'from-emerald-500 to-teal-600', color: 'text-emerald-500' },
    { label: 'WATER', val: stats.waterIntake, target: 8, icon: Droplets, grad: 'from-sky-400 to-blue-600', color: 'text-sky-500' },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowScanner(true);
    setIsScanning(true);
    setDetectedDishes([]);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const dishes = await scanFoodImage(base64, file.name, file);
      
      setTimeout(async () => {
         setIsScanning(false);
         setDetectedDishes(dishes);
         
         for (const dish of dishes) {
           await addMealLog(dish);
         }

         setTimeout(() => {
           setShowScanner(false);
         }, 3000);
      }, 3000);
    };
  };

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-1 lg:col-span-8 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[40px] p-6 lg:p-12 text-white relative overflow-hidden shadow-2xl shadow-gray-300"
        >
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <Sparkles className="text-yellow-400" size={14} />
              <span className="text-[0.6rem] font-black tracking-[0.2em] uppercase">Welcome Back, {profile?.name?.split(' ')[0]}</span>
            </div>
            <h2 className="font-display text-7xl leading-none tracking-tight">
              YOUR DIET IS <br />
              <span className="highlight-curvy text-[#a3e635] text-5xl mt-4">
                {aarogyaScore || 0}% ALIGNED
              </span>
            </h2>
            <p className="text-white/40 text-sm max-w-md font-medium leading-relaxed">
              Based on your goals of <span className="text-white font-bold">{profile?.health_goal}</span>, you are currently in the top 5% of your region.
            </p>
            
            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-[#0d0d14] px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 shadow-2xl shadow-black/20"
              >
                <Scan size={20} /> Start Food Scan
              </motion.button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>
          </div>

          {/* Abstract 3D Shapes */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#3a6e00]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('aarogya')}
          className="col-span-1 lg:col-span-4 bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-xl shadow-gray-200/20 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer group black-glow-card"
        >
           <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                <motion.circle 
                   cx="96" cy="96" r="80" 
                   fill="transparent" 
                   stroke="url(#scoreGrad)" 
                   strokeWidth="12" 
                   strokeDasharray="502.4"
                   initial={{ strokeDashoffset: 502.4 }}
                   animate={{ strokeDashoffset: 502.4 * (1 - (aarogyaScore || 0) / 100) }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   strokeLinecap="round"
                 />
                 <defs>
                   <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#8a2be2" />
                     <stop offset="100%" stopColor="#0070f3" />
                   </linearGradient>
                 </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-6xl font-display leading-none bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-600"
                >
                  {aarogyaScore}
                </motion.span>
                <span className="text-[0.6rem] font-black tracking-[0.3em] text-gray-300 uppercase">Aarogya</span>
              </div>
           </div>
           <div className="mt-8 space-y-2">
              <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[0.6rem] font-black tracking-widest uppercase inline-block">
                GRADE: {aarogyaScore > 85 ? 'A+ OPTIMAL' : aarogyaScore > 70 ? 'B+ GOOD' : 'C FAIR'}
              </div>
              <p className="text-[0.65rem] text-gray-400 font-bold max-w-[180px] leading-relaxed">Your nutrient density is higher than {Math.min(99, aarogyaScore + 10)}% of users in your city.</p>
           </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {homeStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/20 shadow-xl shadow-gray-200/40 relative overflow-hidden group black-glow-card"
          >
             <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50", stat.color)}>
                   <stat.icon size={22} />
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[0.6rem] font-black text-gray-300 tracking-[0.2em]">{stat.label}</span>
                   <div className="flex items-center gap-1 text-emerald-500 text-[0.6rem] font-bold">
                      <TrendingUp size={10} /> +2%
                   </div>
                </div>
             </div>
             <div className="flex items-end gap-2 mb-4 relative z-10">
                <CountUp value={stat.val} className="text-4xl font-display" />
                <span className="text-[0.6rem] mb-1.5 text-gray-400 font-bold uppercase tracking-widest">/ {stat.target}</span>
             </div>
             <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative z-10">
                <motion.div 
                  className={cn("h-full bg-gradient-to-r", stat.grad)} 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.val/stat.target)*100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
             </div>
             
             {/* Decorative Background Icon */}
             <stat.icon size={80} className="absolute -bottom-4 -right-4 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Area: Today's Logs vs Empty State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-xl shadow-gray-200/20 overflow-hidden min-h-[400px] flex flex-col black-glow-card">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center gap-4">
                <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400 flex items-center gap-2">
                  <Clock size={14} className="text-indigo-500" /> TODAY'S LOGS
                </h3>
                {mealLogs.length > 0 && <span className="bg-indigo-600 text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">{mealLogs.length}</span>}
              </div>
              <button 
                onClick={() => onNavigate('aarogya')}
                className="text-[0.6rem] font-black text-indigo-600 tracking-widest uppercase hover:underline"
              >
                Full Analytics
              </button>
            </div>

            {/* QUICK SEARCH AREA */}
            <div className="px-8 py-6 bg-indigo-50/50 border-b border-gray-50">
               <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                     <Search size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Quick Track: Search for Poha, Dal, Roti..."
                    className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  
                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {searchQuery.length > 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 max-h-60 overflow-y-auto p-2"
                      >
                         {filteredFoods.length > 0 ? (
                           filteredFoods.map(food => (
                             <button 
                               key={food.id}
                               onClick={() => handleQuickAdd(food)}
                               className="w-full text-left p-4 hover:bg-gray-50 rounded-2xl flex justify-between items-center group transition-all"
                             >
                                <div>
                                   <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{food.name}</p>
                                   <p className="text-[0.55rem] text-gray-400 font-bold uppercase tracking-widest">{food.serving} • {food.category}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                   <div className="text-right">
                                      <p className="text-xs font-black text-indigo-600">{food.calories} kcal</p>
                                      <p className="text-[0.5rem] text-gray-300 font-bold uppercase">+{food.protein}g Prot</p>
                                   </div>
                                   <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                      <span className="text-lg font-light">+</span>
                                   </div>
                                </div>
                             </button>
                           ))
                         ) : (
                           <div className="p-8 text-center text-[0.6rem] font-black text-gray-300 uppercase tracking-widest">No food found in database</div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
            
            <div className="flex-1 flex flex-col">
               {mealLogs.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200">
                       <Leaf size={48} />
                    </div>
                    <div className="space-y-2">
                       <p className="text-lg font-bold text-gray-800">Your Thali is empty today!</p>
                       <p className="text-xs text-gray-400 max-w-xs leading-relaxed uppercase tracking-widest">Start logging your meals to see your Aarogya Score move in real-time.</p>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl text-[0.6rem] font-bold tracking-widest uppercase hover:bg-gray-200 transition-all"
                    >
                      Log First Meal
                    </button>
                 </div>
               ) : (
                 <div className="p-6 grid grid-cols-2 gap-4">
                    {mealLogs.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={i} 
                        className="p-5 flex flex-col justify-between bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                      >
                         <div className="flex items-start justify-between mb-4">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                                <Leaf size={18} />
                             </div>
                             <div>
                               <p className="text-sm font-black tracking-tight text-gray-800 leading-tight truncate max-w-[120px]">{log.name_en}</p>
                               <p className="text-[0.55rem] text-gray-400 tracking-widest uppercase font-bold mt-0.5">
                                 {new Date(log.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                               </p>
                             </div>
                           </div>
                           <div className="text-right">
                             <p className="text-xs font-black text-indigo-600">{Math.round(log.calories_kcal || 0)} <span className="text-[0.5rem] text-gray-400">KCAL</span></p>
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-2 mt-auto">
                            <div className="bg-gray-50 rounded-xl p-2 text-center">
                              <p className="text-[0.55rem] font-black tracking-widest text-gray-400 uppercase">Protein</p>
                              <p className="text-xs font-black text-gray-700">{log.protein_g}g</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-2 text-center">
                              <p className="text-[0.55rem] font-black tracking-widest text-gray-400 uppercase">Fiber</p>
                              <p className="text-xs font-black text-gray-700">{log.fibre_g || 0}g</p>
                            </div>
                         </div>
                         
                         <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                            <p className={cn("text-[0.55rem] font-black tracking-widest uppercase", log.is_fasting_approved ? "text-emerald-500" : "text-amber-500")}>
                               {log.is_fasting_approved ? '✓ SATVIK ALIGNED' : 'REGULAR MEAL'}
                            </p>
                            <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                         </div>
                      </motion.div>
                    ))}
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-8">
           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-200"
           >
              <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-start">
                    <h4 className="font-display text-3xl leading-tight uppercase">WEEKLY <br /> CHALLENGE</h4>
                    <Award size={32} className="text-yellow-400" />
                 </div>
                 <p className="text-white/60 text-[0.65rem] font-bold leading-relaxed uppercase tracking-widest">Eat 5 regional Satvik dishes this week to unlock the "Ancient Roots" badge.</p>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[0.6rem] font-black tracking-widest">
                       <span>PROGRESS</span>
                       <span>3/5</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-white shadow-[0_0_15px_white]" />
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white text-purple-700 rounded-2xl font-black text-[0.6rem] tracking-[0.2em] uppercase shadow-xl shadow-purple-900/20">
                    Join Challenge
                 </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
           </motion.div>

           <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-xl shadow-gray-200/20">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <Droplets size={16} className="text-blue-500" />
                    <h4 className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">HYDRATION</h4>
                 </div>
                 <span className="text-xs font-black text-blue-600">6 / 8 glasses</span>
              </div>
              <div className="flex gap-2 mb-6">
                 {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className={cn("flex-1 h-2 rounded-full", i <= 6 ? "bg-blue-500 shadow-lg shadow-blue-200" : "bg-gray-100")} />
                 ))}
              </div>
              <button className="w-full py-4 bg-blue-50 text-blue-600 rounded-2xl text-[0.6rem] font-black tracking-widest uppercase hover:bg-blue-100 transition-all">
                 + Add Glass
              </button>
           </div>
        </div>
      </div>

      {/* Google Pay Style Scanner Overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0d0d14]/90 backdrop-blur-xl flex flex-col items-center justify-center p-10"
          >
             <div className="relative w-80 h-80">
                {/* Scanner Corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#a3e635] rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#a3e635] rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#a3e635] rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#a3e635] rounded-br-3xl" />
                
                {/* Scanning Bar Animation */}
                <motion.div 
                   animate={{ top: ['0%', '95%', '0%'] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#a3e635] to-transparent shadow-[0_0_20px_#a3e635] z-10"
                />

                <div className="absolute inset-8 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                   {isScanning ? (
                     <div className="text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-[#a3e635] font-display text-2xl tracking-widest uppercase">Analyzing Thali</p>
                     </div>
                   ) : (
                     <div className="relative w-full h-full">
                        {/* YOLO Bounding Boxes */}
                        {detectedDishes.map((dish, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                              position: 'absolute',
                              left: `${(dish.box[0] / 400) * 100}%`,
                              top: `${(dish.box[1] / 400) * 100}%`,
                              width: `${((dish.box[2] - dish.box[0]) / 400) * 100}%`,
                              height: `${((dish.box[3] - dish.box[1]) / 400) * 100}%`,
                              border: '2px solid #a3e635',
                              borderRadius: '8px',
                              boxShadow: '0 0 15px rgba(163, 230, 53, 0.4)'
                            }}
                          >
                            <div className="absolute top-0 left-0 -translate-y-full bg-[#a3e635] text-[#0d0d14] px-2 py-0.5 rounded-t-md text-[0.5rem] font-black uppercase tracking-widest whitespace-nowrap">
                              {dish.name_en}
                            </div>
                          </motion.div>
                        ))}

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                           <Check size={64} className="text-[#a3e635] mb-4" />
                           <p className="text-[#a3e635] font-display text-3xl uppercase tracking-tighter">Scan Complete</p>
                           <p className="text-[#a3e635]/60 text-[0.6rem] font-bold uppercase tracking-widest">{detectedDishes.length} Items Detected</p>
                        </div>
                     </div>
                   )}
                </div>
             </div>
             
             <div className="mt-12 text-center space-y-2">
                <h3 className="text-white font-display text-4xl uppercase tracking-tighter">AI VISION ACTIVE</h3>
                <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Detecting ingredients, portions & calories...</p>
             </div>

             <button 
               onClick={() => setShowScanner(false)}
               className="mt-20 px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[0.6rem] font-bold tracking-widest uppercase border border-white/10 transition-all"
             >
                Cancel Scan
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

function ClockIcon({ size, className }: { size: number, className: string }) {
  return <div className={className}><Search size={size} /></div>;
}

function CountUp({ value, className }: { value: number, className: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span className={className}>{displayValue}</span>;
}
