
import React, { useState } from 'react';
import { LifeData, LifeStats, generateMonthsArray } from '../utils/calculations';
import { motion } from 'framer-motion';

interface LifeVisualizationProps {
  lifeData: LifeData;
  lifeStats: LifeStats;
}

const LifeVisualization: React.FC<LifeVisualizationProps> = ({ 
  lifeData, 
  lifeStats 
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  
  // Generate months array
  const months = generateMonthsArray(lifeData, lifeStats);
  
  // Calculate grid size
  // We'll show 12 months per row (1 year)
  const dotsPerRow = 12;
  const totalRows = Math.ceil(months.length / dotsPerRow);
  
  // Tooltip content based on month index
  const getTooltipContent = (monthIndex: number) => {
    const years = Math.floor(monthIndex / 12);
    const remainingMonths = monthIndex % 12;
    const type = months[monthIndex]?.type || 'unknown';
    
    const typeMap: Record<string, string> = {
      'past': 'Month already lived',
      'sleep': 'Month equivalent spent sleeping',
      'work': 'Month equivalent spent working',
      'routine': 'Month equivalent spent on daily routines',
      'living': 'Month equivalent spent on basic living activities',
      'free': 'Month of truly free time',
      'unknown': 'Unknown'
    };
    
    return `Age ${years} years, ${remainingMonths} months - ${typeMap[type]}`;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="relative">
      <motion.div 
        className="grid grid-cols-12 gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {months.map((month, index) => (
          <motion.div
            key={index}
            className={`dot dot-${month.type} hover:scale-125 transition-transform`}
            onMouseEnter={() => setHoveredMonth(index)}
            onMouseLeave={() => setHoveredMonth(null)}
            variants={itemVariants}
          />
        ))}
      </motion.div>
      
      {/* Current age indicator */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Your current age:</p>
        <p className="text-2xl font-serif">{Math.floor(lifeStats.monthsLived / 12)} years, {lifeStats.monthsLived % 12} months</p>
      </div>
      
      {/* Tooltip */}
      {hoveredMonth !== null && (
        <div 
          className="absolute bg-white text-black border border-gray-200 shadow-lg rounded-md p-2 text-xs z-10"
          style={{
            top: `${Math.floor(hoveredMonth / dotsPerRow) * 20 - 30}px`,
            left: `${(hoveredMonth % dotsPerRow) * 20 + 10}px`,
            transform: 'translateX(-50%)',
            minWidth: '180px'
          }}
        >
          {getTooltipContent(hoveredMonth)}
        </div>
      )}
      
      {/* Stats summary */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Months lived</p>
          <p className="text-xl font-medium">{Math.floor(lifeStats.monthsLived)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Months remaining</p>
          <p className="text-xl font-medium">{Math.floor(lifeStats.monthsRemaining)}</p>
        </div>
      </div>
    </div>
  );
};

export default LifeVisualization;
