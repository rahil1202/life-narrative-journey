import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageContent from './PageContent';
import { LifeData, LifeStats, calculateLifeStats } from '../utils/calculations';
import { Book as BookIcon, ArrowLeft, ArrowRight } from 'lucide-react';

interface BookProps {
  className?: string;
}

const DEFAULT_LIFE_DATA: LifeData = {
  dateOfBirth: new Date(1990, 0, 1), // January 1, 1990
  sleepHours: 8,
  careerType: 'office',
  targetAge: 90
};

const Book: React.FC<BookProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [lifeData, setLifeData] = useState<LifeData>(DEFAULT_LIFE_DATA);
  const [lifeStats, setLifeStats] = useState<LifeStats | null>(null);
  const [showCalculation, setShowCalculation] = useState(false);
  
  const totalPages = 6; // Cover + 5 content pages
  
  useEffect(() => {
    // Calculate life statistics when lifeData changes or calculation is triggered
    if (showCalculation) {
      const stats = calculateLifeStats(lifeData);
      setLifeStats(stats);
    }
  }, [lifeData, showCalculation]);
  
  const handleOpenBook = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setCurrentPage(1), 1500); // Wait for cover to open
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) { // Don't go back past page 1 (after cover)
      setCurrentPage(prev => prev - 1);
    } else if (currentPage === 1) {
      // Close the book
      setCurrentPage(0);
      setTimeout(() => setIsOpen(false), 1500);
    }
  };
  
  const updateLifeData = (newData: Partial<LifeData>) => {
    setLifeData(prev => ({ ...prev, ...newData }));
  };
  
  const handleSubmitForm = () => {
    setShowCalculation(true);
    goToNextPage(); // Go to visualization page
  };
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className={`perspective ${className} w-full max-w-4xl mx-auto`}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={variants}
        className="relative preserve-3d mx-auto"
        style={{ maxWidth: isOpen ? '900px' : '450px', height: '600px' }}
      >
        {/* Book Cover (closed state) */}
        <div 
          className={`book-cover absolute inset-0 flex items-center justify-center transition-transform duration-1500 preserve-3d cursor-pointer rounded-lg overflow-hidden ${
            isOpen ? 'animate-page-turn' : ''
          }`}
          onClick={handleOpenBook}
          style={{ 
            transformOrigin: 'left center',
            zIndex: isOpen ? 10 : 20,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="book-spine"></div>
          <div className="text-center p-8 backface-hidden flex flex-col items-center justify-center h-full">
            <BookIcon className="h-12 w-12 mb-8 text-white/80" />
            <h1 className="text-4xl font-bold mb-6 tracking-wider">LIFE LEFT</h1>
            <p className="italic text-xl font-light text-white/80">How much time do you really have?</p>
            
            {!isOpen && (
              <div className="mt-12 text-white/70 text-sm animate-pulse">
                Click to open
              </div>
            )}
          </div>
        </div>
        
        {/* Book Pages */}
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="book-page absolute inset-0 flex rounded-lg overflow-hidden"
            style={{ 
              zIndex: isOpen ? 15 : 5,
              display: isOpen ? 'flex' : 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="w-full h-full p-10 overflow-y-auto flex flex-col justify-between bg-gradient-to-br from-book-page to-white">
              <PageContent 
                pageNumber={currentPage} 
                lifeData={lifeData}
                lifeStats={lifeStats}
                updateLifeData={updateLifeData}
                onSubmit={handleSubmitForm}
              />
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button 
                  onClick={goToPrevPage} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentPage === 1 ? 'Close Book' : 'Previous Page'}
                </button>
                
                {currentPage < totalPages - 1 && (
                  <button 
                    onClick={goToNextPage} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center"
                  >
                    Next Page
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Back of book (when open) */}
        <div 
          className="book-page absolute inset-0 bg-gradient-to-br from-book-edge to-book-page rounded-lg overflow-hidden"
          style={{ 
            zIndex: 1,
            display: isOpen ? 'block' : 'none',
            boxShadow: 'inset 8px 0 15px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="w-full h-full p-12 flex items-center justify-center">
            <p className="text-gray-400 italic text-sm">
              "The two most important days in your life are the day you are born and the day you find out why."
              <br />
              <span className="mt-2 block">— Mark Twain</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Book;
