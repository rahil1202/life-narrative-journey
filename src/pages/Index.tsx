
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-6">
            LIFE LEFT
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A visual journey through your most precious resource: time.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl max-w-3xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl font-serif leading-relaxed mb-8">
                Every day, the clock ticks. Every moment, a choice is made. How we spend our time defines who we become, yet we rarely pause to truly see the canvas of our existence.
              </p>
              <p className="text-lg md:text-xl font-serif leading-relaxed italic">
                "The two most powerful warriors are patience and time."
                <span className="block text-right mt-2">— Leo Tolstoy</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center"
        >
          <Button 
            size="lg"
            className="bg-primary/90 hover:bg-primary text-lg font-medium px-8 py-6 h-auto group transition-all duration-300"
            asChild
          >
            <Link to="/life-book">
              Begin Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-8 text-muted-foreground"
          >
            Discover the true value of your remaining time
          </motion.p>
        </motion.div>
      </div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 text-center text-muted-foreground/70 text-sm max-w-lg mx-auto px-4"
      >
        <p>
          "We have two lives, and the second begins when we realize we only have one."
          <br />
          <span className="italic">— Confucius</span>
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
