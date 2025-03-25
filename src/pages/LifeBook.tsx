
import Book from '../components/Book';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LifeBook = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 bg-gradient-to-b from-background to-secondary/30 overflow-y-hidden">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full"
      >
        <Book className="animate-float" />
      </motion.div>     
     </div>
  );
};

export default LifeBook;