import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  // Dynamic time of day greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 18) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);

  // Subtle animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12
      }
    }
  };

  return (
    <motion.div 
      className="h-screen flex flex-col items-center justify-center py-0 px-4 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Subtle Background Particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.03, 0.05, 0.03],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-7xl font-serif font-light tracking-tight mb-2 relative inline-block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 1
              }
            }}
          >
            LIFE LEFT
            <motion.span 
              className="absolute -top-2 -right-12 text-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <Hourglass className="text-primary/50" size={32} />
            </motion.span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-0">
            A visual journey through your most precious resource: time.
          </p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl max-w-3xl mx-auto"
          >
            <CardContent className="p-8 md:p-6 relative">
              <motion.div
                className="absolute inset-0 border-2 border-white/10 opacity-50 pointer-events-none"
                initial={{ scale: 0.95 }}
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <p className="text-lg md:text-xl font-serif leading-relaxed mb-4 relative z-10">
                Good {timeOfDay}. Every moment is a choice. How we spend our time defines who we become, yet we rarely pause to truly see the canvas of our existence.
              </p>
              <p className="text-lg md:text-xl font-serif leading-relaxed italic mt-0 relative z-10">
                "The two most powerful warriors are patience and time."
                <span className="block text-right mt-2">— Leo Tolstoy</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <Button 
            size="lg"
            className="bg-primary/90 hover:bg-primary text-lg font-medium px-10 py-5 group transition-all duration-300 shadow-md hover:shadow-lg"
            asChild
          >
            <Link to="/life-book" className="flex items-center">
              Begin Your Journey
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={22} />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      <motion.footer
        variants={itemVariants}
        className="absolute bottom-0 text-center text-muted-foreground/70 text-sm max-w-lg mx-auto px-4"
      >
        <p>
          "We have two lives, and the second begins when we realize we only have one."
          <br />
          <span className="italic">— Confucius</span>
        </p>
      </motion.footer>

      {/* Subtle Time Flow Visualization */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary/80"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: 1,
          transition: {
            duration: 10,
            ease: "linear",
            repeat: Infinity
          }
        }}
      />
    </motion.div>
  );
};

export default Index;