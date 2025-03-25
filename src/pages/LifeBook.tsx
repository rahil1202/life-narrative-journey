
import React from 'react';
import Book from '../components/Book';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LifeBook = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-b from-background to-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6"
      >
        <Link 
          to="/" 
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 tracking-wide">LIFE LEFT</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          A visual journey through your most precious resource: time.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full"
      >
        <Book className="animate-float" />
      </motion.div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center text-muted-foreground text-sm"
      >
        <p>Click the book to open and begin your journey</p>
      </motion.footer>
    </div>
  );
};

export default LifeBook;
