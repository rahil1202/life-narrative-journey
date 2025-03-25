import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden"
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

      <div className="text-center relative z-10 max-w-xl mx-auto px-4">
        <motion.div variants={itemVariants}>
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-4 text-primary/80">
              404
            </h1>
            <motion.span 
              className="absolute -top-2 -right-10 text-sm"
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
              <Layers className="text-primary/50" size={32} />
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Oops! The page you're looking for seems to have slipped through time.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button 
            size="lg"
            className="bg-primary/90 hover:bg-primary text-lg font-medium px-10 py-5 group transition-all duration-300 shadow-md hover:shadow-lg"
            asChild
          >
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" size={22} />
              Return to Home
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 text-muted-foreground/70 text-sm italic"
        >
          <p>Sometimes, the journey is more about finding your way back.</p>
        </motion.div>
      </div>

      {/* Subtle Time Flow Visualization */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20"
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

export default NotFound;