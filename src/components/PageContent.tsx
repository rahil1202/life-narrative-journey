
import React from 'react';
import { LifeData, LifeStats } from '../utils/calculations';
import UserInputForm from './UserInputForm';
import LifeVisualization from './LifeVisualization';

interface PageContentProps {
  pageNumber: number;
  lifeData: LifeData;
  lifeStats: LifeStats | null;
  updateLifeData: (data: Partial<LifeData>) => void;
  onSubmit: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ 
  pageNumber, 
  lifeData, 
  lifeStats,
  updateLifeData, 
  onSubmit 
}) => {
  // Cover page (0) is handled separately in Book component
  switch (pageNumber) {
    case 1: // Introduction page
      return (
        <div className="prose max-w-none">
          <h2 className="text-3xl font-serif mb-6">A Journey Through Time</h2>
          <p className="text-lg leading-relaxed mb-4">
            We are given but a finite amount of time on this earth, yet we rarely pause to truly contemplate how we spend these precious moments.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Each day passes, becoming weeks, months, years—gradually shaping the story of our existence. How much of this story have you already written? How many blank pages remain?
          </p>
          <p className="text-lg leading-relaxed mb-6">
            This experience invites you to visualize your life in its entirety—from birth to the final chapter—and reflect on how you wish to write the remainder of your narrative.
          </p>
          <p className="text-lg italic">
            "Time is the coin of your life. It is the only coin you have, and only you can determine how it will be spent."
            <br />
            <span className="block text-right mt-2">— Carl Sandburg</span>
          </p>
        </div>
      );
    
    case 2: // How it works page
      return (
        <div className="prose max-w-none">
          {/* <h2 className="text-3xl font-serif mb-6">How It Works</h2>
          <p className="text-lg leading-relaxed mb-6">
            This experience uses a simple but powerful calculation to help you visualize your remaining time and how it might be spent.
          </p>
           */}
          <h2 className="text-3xl font-serif mb-2">The Calculation</h2>
          <p className="mb-6">
            Based on your date of birth and an average life expectancy of 90 years, we calculate how many months you've lived and how many remain. We then estimate how those months are typically allocated:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="glass-panel p-4">
              <div className="flex items-center mb-2">
                <div className="dot dot-sleep mr-2"></div>
                <p className="font-medium">Sleep</p>
              </div>
              <p className="text-sm">About 1/3 of your life (based on your average sleep hours)</p>
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center mb-2">
                <div className="dot dot-work mr-2"></div>
                <p className="font-medium">Work</p>
              </div>
              <p className="text-sm">Based on career type, roughly 40-50 hours per week from ages 18-65</p>
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center mb-2">
                <div className="dot dot-routine mr-2"></div>
                <p className="font-medium">Routine</p>
              </div>
              <p className="text-sm">Hygiene, commuting, obligations (approximately 2 hours daily)</p>
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center mb-2">
                <div className="dot dot-living mr-2"></div>
                <p className="font-medium">Living</p>
              </div>
              <p className="text-sm">Eating, chores, errands, basic social activities (about 4 hours daily)</p>
            </div>
          </div>
        </div>
      );
    
    case 3: // User input form
      return (
        <div className="prose max-w-none">
          <h2 className="text-3xl font-serif mb-2">Your Life Details</h2>
          <p className="text-lg mb-4">
            To calculate your life timeline, please provide the following information:
          </p>
          
          <UserInputForm 
            lifeData={lifeData}
            updateLifeData={updateLifeData}
            onSubmit={onSubmit}
          />
        </div>
      );
    
    case 4: // Life visualization
      return (
        <div className="prose max-w-none">
          <h2 className="text-3xl font-serif mb-6">Your Life in Months</h2>
          {lifeStats ? (
            <>
              <div className="mb-8">
                <p className="text-lg mb-4">
                  Each dot represents one month of your life. Here's how your time is typically allocated:
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <div className="flex items-center">
                    <div className="dot dot-past mr-1"></div>
                    <span className="text-sm">Past</span>
                  </div>
                  <div className="flex items-center">
                    <div className="dot dot-sleep mr-1"></div>
                    <span className="text-sm">Sleep</span>
                  </div>
                  <div className="flex items-center">
                    <div className="dot dot-work mr-1"></div>
                    <span className="text-sm">Work</span>
                  </div>
                  <div className="flex items-center">
                    <div className="dot dot-routine mr-1"></div>
                    <span className="text-sm">Routine</span>
                  </div>
                  <div className="flex items-center">
                    <div className="dot dot-living mr-1"></div>
                    <span className="text-sm">Living</span>
                  </div>
                  <div className="flex items-center">
                    <div className="dot dot-free mr-1"></div>
                    <span className="text-sm">Free</span>
                  </div>
                </div>
                
                <LifeVisualization lifeData={lifeData} lifeStats={lifeStats} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                Please go back and submit your life details to see your visualization.
              </p>
            </div>
          )}
        </div>
      );
    
    case 5: // Reflection page
      return (
        <div className="prose max-w-none">
          <h2 className="text-3xl font-serif mb-6">Reflections</h2>
          
          {lifeStats ? (
            <div className="mb-8 text-center">
              <div className="glass-panel p-6 mb-8">
                <h3 className="text-2xl font-serif mb-4">Your Life in Numbers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500">Months lived</p>
                    <p className="text-2xl font-serif">{Math.floor(lifeStats.monthsLived)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Months remaining</p>
                    <p className="text-2xl font-serif">{Math.floor(lifeStats.monthsRemaining)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Free months remaining</p>
                    <p className="text-2xl font-serif">{Math.floor(lifeStats.freeMonthsRemaining)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Life percentage lived</p>
                    <p className="text-2xl font-serif">{Math.floor(lifeStats.percentageLived)}%</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xl mb-6 font-serif">
                You have approximately {Math.floor(lifeStats.freeMonthsRemaining)} months of truly free time remaining.
                <br />
                <span className="italic font-light">Make them count.</span>
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-500 text-center py-12">
              Complete the previous steps to see your life reflection.
            </p>
          )}
          
          <div className="mt-12">
            <h3 className="text-xl font-serif mb-4">Some Questions to Consider</h3>
            <ul className="space-y-4 text-left">
              <li>If your remaining time were condensed into a single day, what would you prioritize?</li>
              <li>Which activities in your life right now are truly worth the months they consume?</li>
              <li>What are you postponing that deserves a place in your limited free time?</li>
              <li>How might you increase the quality of your remaining time, even if you cannot increase its quantity?</li>
            </ul>
          </div>
          
          <p className="mt-12 text-lg italic text-center">
            "Life is long if you know how to use it."
            <br />
            <span className="block mt-2">— Seneca</span>
          </p>
        </div>
      );
    
    default:
      return <div className="text-center py-12">Page not found</div>;
  }
};

export default PageContent;
