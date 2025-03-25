import React, { useState, useMemo } from 'react';
import { LifeData, LifeStats, generateMonthsArray } from '../utils/calculations';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Heart, 
  Star, 
  Smile, 
  Activity, 
  BarChart2, 
  Layers,
  Compass
} from 'lucide-react';

interface LifeVisualizationProps {
  lifeData: LifeData;
  lifeStats: LifeStats;
}

const LifeVisualization: React.FC<LifeVisualizationProps> = ({ 
  lifeData, 
  lifeStats 
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);
  
  // Memoize months generation
  const months = useMemo(() => generateMonthsArray(lifeData, lifeStats), [lifeData, lifeStats]);
  
  // Enhanced emotional type descriptions
  const typeDescriptions: Record<string, { 
    description: string, 
    emotionalNuance: string, 
    color: string, 
    icon: React.ElementType,
    reflection: string 
  }> = {
    'past': {
      description: 'Memories Woven',
      emotionalNuance: 'Echoes of experiences that whisper your story',
      color: 'text-black',
      icon: Clock,
      reflection: "Every moment leaves an invisible mark on your soul."
    },
    'sleep': {
      description: 'Restoration Realm',
      emotionalNuance: 'Silent healing and subconscious renewal',
      color: 'text-red-500',
      icon: Heart,
      reflection: "In stillness, we rebuild our inner landscapes."
    },
    'work': {
      description: 'Purpose in Motion',
      emotionalNuance: 'Transforming dreams into tangible realities',
      color: 'text-orange-500',
      icon: Activity,
      reflection: "Your efforts are brushstrokes painting your life's canvas."
    },
    'routine': {
      description: 'Rhythmic Foundations',
      emotionalNuance: 'Subtle strength in daily consistencies',
      color: 'text-blue-500',
      icon: Layers,
      reflection: "Consistency is the quiet poetry of existence."
    },
    'living': {
      description: 'Essential Breaths',
      emotionalNuance: 'Celebrating the simple miracle of being',
      color: 'text-green-500',
      icon: Star,
      reflection: "Life flows through you, not just around you."
    },
    'free': {
      description: 'Spontaneous Spirits',
      emotionalNuance: 'Moments of unbridled authenticity',
      color: 'text-gray-500',
      icon: Smile,
      reflection: "Freedom is not an escape, but a return to oneself."
    },
    'unknown': {
      description: 'Uncharted Horizons',
      emotionalNuance: 'Potential waiting to bloom',
      color: 'text-red-500',
      icon: Compass,
      reflection: "The most beautiful landscapes are those yet unexplored."
    }
  };
  
  // Life progress calculation
  const calculateLifeProgress = () => {
    const totalMonths = lifeStats.monthsLived + lifeStats.monthsRemaining;
    const livedPercentage = (lifeStats.monthsLived / totalMonths) * 100;
    const remainingPercentage = (lifeStats.monthsRemaining / totalMonths) * 100;

    return {
      lived: {
        months: Math.floor(lifeStats.monthsLived),
        years: Math.floor(lifeStats.monthsLived / 12),
        percentage: livedPercentage
      },
      remaining: {
        months: Math.floor(lifeStats.monthsRemaining),
        years: Math.floor(lifeStats.monthsRemaining / 12),
        percentage: remainingPercentage
      }
    };
  };

  const lifeProgress = useMemo(calculateLifeProgress, [lifeStats]);

  // Category percentage calculation
  const calculateCategoryPercentages = () => {
    const categoryCount: Record<string, number> = {};
    months.forEach(month => {
      const type = month.type || 'unknown';
      categoryCount[type] = (categoryCount[type] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .map(([type, count]) => ({
        type,
        percentage: (count / months.length) * 100,
        ...typeDescriptions[type]
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const categoryPercentages = useMemo(calculateCategoryPercentages, [months]);

  // Subtle animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12
      }
    }
  };

  return (
    <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden">
      {/* Emotional Journey Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Landscape of Your Life
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A mosaic of moments, emotions, and unfolding potential
        </p>
      </motion.div>

      {/* Life Progression Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        {/* Lived Life Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-700">
                Chapters Lived
              </h3>
              <p className="text-sm text-gray-600">
                {lifeProgress.lived.years} years, {lifeProgress.lived.months % 12} months
              </p>
            </div>
            <Clock className="text-blue-500 w-10 h-10" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${lifeProgress.lived.percentage}%` }}
              transition={{ duration: 1, type: "spring" }}
              className="bg-black h-3"
            />
          </div>
        </div>

        {/* Remaining Life Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-purple-700">
                Chapters Awaiting
              </h3>
              <p className="text-sm text-gray-600">
                {lifeProgress.remaining.years} years, {lifeProgress.remaining.months % 12} months
              </p>
            </div>
            <Compass className="text-purple-500 w-10 h-10" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${lifeProgress.remaining.percentage}%` }}
              transition={{ duration: 1, type: "spring" }}
              className="bg-purple-500 h-3"
            />
          </div>
        </div>
      </motion.div>

      {/* Life Timeline Grid */}
      <motion.div 
        className="grid grid-cols-12 gap-1 mx-auto max-w-4xl mb-8 bg-white rounded-2xl p-4 shadow-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {months.map((month, index) => (
          <motion.div
            key={index}
            className={`
              dot dot-${month.type} 
              w-4 h-4 rounded-full 
              cursor-pointer 
              transition-all duration-300 
              ${typeDescriptions[month.type || 'unknown'].color.replace('text-', 'bg-')}
              ${focusedCategory && month.type !== focusedCategory 
                ? 'opacity-20' 
                : 'opacity-80 hover:scale-125 hover:z-10 hover:opacity-100'
              }
            `}
            onMouseEnter={() => setHoveredMonth(index)}
            onMouseLeave={() => setHoveredMonth(null)}
            variants={itemVariants}
            title={`Age ${Math.floor(index / 12)} years, ${index % 12} months`}
          />
        ))}
      </motion.div>

      {/* Category Emotional Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Emotional Life Composition
        </h3>
        <div className="space-y-4">
          {categoryPercentages.map(category => (
            <motion.div 
              key={category.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`
                flex items-center p-3 rounded-lg cursor-pointer 
                transition-all duration-300 
                ${focusedCategory === category.type 
                  ? 'bg-blue-50 shadow-md' 
                  : 'hover:bg-gray-50'
                }
              `}
              onClick={() => setFocusedCategory(
                focusedCategory === category.type ? null : category.type
              )}
            >
              <div className="w-1/4 flex items-center space-x-3">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <span className="font-medium capitalize">{category.type}</span>
              </div>
              <div className="w-3/4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className={`${category.color.replace('text-', 'bg-')} h-3 rounded-full`}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {category.percentage.toFixed(1)}% • {category.reflection}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredMonth !== null && (
          <motion.div 
            className="fixed bg-white text-black border-2 border-gray-200 shadow-2xl rounded-xl p-5 z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              top: `calc(${Math.floor(hoveredMonth / 12) * 5}% + 20px)`,
              left: `calc(${(hoveredMonth % 12) / 12 * 100}% + 10px)`,
              transform: 'translate(-50%, -100%)',
              minWidth: '300px'
            }}
          >
            {(() => {
              const month = months[hoveredMonth];
              const typeInfo = typeDescriptions[month.type || 'unknown'];
              const years = Math.floor(hoveredMonth / 12);
              const remainingMonths = hoveredMonth % 12;
              const Icon = typeInfo.icon;

              return (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-8 h-8 ${typeInfo.color}`} />
                    <h4 className="text-lg font-bold">
                      Age: {years} years, {remainingMonths} months
                    </h4>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{typeInfo.description}</p>
                    <p className="text-sm text-gray-600">{typeInfo.emotionalNuance}</p>
                  </div>
                  <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-3">
                    "{typeInfo.reflection}"
                  </blockquote>
                  {month.details && (
                    <p className="text-sm italic text-gray-700 mt-2">{month.details}</p>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeVisualization;