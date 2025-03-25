
import React from 'react';
import { LifeData } from '../utils/calculations';
import { format } from 'date-fns';

interface UserInputFormProps {
  lifeData: LifeData;
  updateLifeData: (data: Partial<LifeData>) => void;
  onSubmit: () => void;
}

const UserInputForm: React.FC<UserInputFormProps> = ({
  lifeData,
  updateLifeData,
  onSubmit,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLifeData({ dateOfBirth: new Date(e.target.value) });
  };
  
  const handleSleepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLifeData({ sleepHours: parseInt(e.target.value) });
  };
  
  const handleCareerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLifeData({ careerType: e.target.value });
  };
  
  const handleTargetAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLifeData({ targetAge: parseInt(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  // Format the date for the input value
  const formattedDate = format(lifeData.dateOfBirth, 'yyyy-MM-dd');

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Date of Birth
        </label>
        <input
          type="date"
          value={formattedDate}
          onChange={handleDateChange}
          className="input-field"
          max={format(new Date(), 'yyyy-MM-dd')} // Cannot select future dates
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Average Sleep Hours Per Day
        </label>
        <div className="flex items-center">
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={lifeData.sleepHours}
            onChange={handleSleepChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="ml-4 min-w-8 text-center">{lifeData.sleepHours}h</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Career Type
        </label>
        <select
          value={lifeData.careerType}
          onChange={handleCareerChange}
          className="input-field"
          required
        >
          <option value="office">Office/Corporate</option>
          <option value="creative">Creative/Freelance</option>
          <option value="service">Service Industry</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="retired">Retired</option>
          <option value="student">Student</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Target Life Expectancy (Years)
        </label>
        <div className="flex items-center">
          <input
            type="range"
            min="60"
            max="120"
            value={lifeData.targetAge}
            onChange={handleTargetAgeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="ml-4 min-w-8 text-center">{lifeData.targetAge}</span>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-book-cover hover:bg-opacity-90 transition-colors text-white rounded-md font-medium"
        >
          Visualize My Life
        </button>
      </div>
    </form>
  );
};

export default UserInputForm;
