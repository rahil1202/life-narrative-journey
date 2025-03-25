
export interface LifeData {
  dateOfBirth: Date;
  sleepHours: number;
  careerType: string;
  targetAge: number;
}

export interface LifeStats {
  monthsLived: number;
  monthsTotal: number;
  monthsRemaining: number;
  freeMonthsLived: number;
  freeMonthsRemaining: number;
  percentageLived: number;
  sleepMonths: number;
  workMonths: number;
  routineMonths: number;
  livingMonths: number;
  freeMonthsTotal: number;
}

// Work hours per career type
const careerHours: Record<string, number> = {
  "office": 40,
  "creative": 35,
  "service": 45,
  "healthcare": 50,
  "education": 38,
  "retired": 0,
  "student": 30
};

// Constants
const MONTHS_IN_YEAR = 12;
const DAYS_IN_MONTH = 30.44; // Average
const HOURS_IN_DAY = 24;

export const calculateLifeStats = (data: LifeData): LifeStats => {
  const today = new Date();
  const birthDate = new Date(data.dateOfBirth);
  
  // Calculate months lived
  const monthsLived = (today.getFullYear() - birthDate.getFullYear()) * MONTHS_IN_YEAR + 
                     (today.getMonth() - birthDate.getMonth());
  
  // Total months to target age
  const monthsTotal = data.targetAge * MONTHS_IN_YEAR;
  
  // Remaining months
  const monthsRemaining = Math.max(0, monthsTotal - monthsLived);
  
  // Percentage of life lived
  const percentageLived = (monthsLived / monthsTotal) * 100;
  
  // Calculate time spent on different activities
  
  // Sleep time
  const sleepHoursPerDay = data.sleepHours;
  const sleepHoursPerMonth = sleepHoursPerDay * DAYS_IN_MONTH;
  const sleepMonthEquivalent = sleepHoursPerMonth / HOURS_IN_DAY / DAYS_IN_MONTH;
  const sleepMonths = sleepMonthEquivalent * monthsTotal;
  
  // Work time
  const workHoursPerWeek = careerHours[data.careerType] || 40;
  const workDaysPerMonth = DAYS_IN_MONTH * (5/7); // Assuming 5-day work weeks
  const workHoursPerMonth = (workHoursPerWeek / 5) * workDaysPerMonth;
  const workMonthEquivalent = workHoursPerMonth / HOURS_IN_DAY / DAYS_IN_MONTH;
  
  // Only count work from age 18 to 65
  const workingYears = Math.min(data.targetAge, 65) - Math.min(Math.max(18, birthDate.getFullYear() - today.getFullYear() + today.getFullYear()), data.targetAge);
  const workMonths = workMonthEquivalent * (workingYears * MONTHS_IN_YEAR);
  
  // Routine time (hygiene, commute, basic tasks) - estimate 2 hours per day
  const routineHoursPerDay = 2;
  const routineHoursPerMonth = routineHoursPerDay * DAYS_IN_MONTH;
  const routineMonthEquivalent = routineHoursPerMonth / HOURS_IN_DAY / DAYS_IN_MONTH;
  const routineMonths = routineMonthEquivalent * monthsTotal;
  
  // Living time (eating, socializing, chores) - estimate 4 hours per day
  const livingHoursPerDay = 4;
  const livingHoursPerMonth = livingHoursPerDay * DAYS_IN_MONTH;
  const livingMonthEquivalent = livingHoursPerMonth / HOURS_IN_DAY / DAYS_IN_MONTH;
  const livingMonths = livingMonthEquivalent * monthsTotal;
  
  // Free time (the rest)
  const totalAllocatedMonths = sleepMonths + workMonths + routineMonths + livingMonths;
  const freeMonthsTotal = Math.max(0, monthsTotal - totalAllocatedMonths);
  
  // Calculate free months already lived and remaining
  const freeMonthsLived = Math.min(freeMonthsTotal, (monthsLived / monthsTotal) * freeMonthsTotal);
  const freeMonthsRemaining = Math.max(0, freeMonthsTotal - freeMonthsLived);
  
  return {
    monthsLived,
    monthsTotal,
    monthsRemaining,
    freeMonthsLived,
    freeMonthsRemaining,
    percentageLived,
    sleepMonths,
    workMonths,
    routineMonths,
    livingMonths,
    freeMonthsTotal,
  };
};

// Generate an array representing all months
export const generateMonthsArray = (lifeData: LifeData, lifeStats: LifeStats) => {
  const monthsArray = [];
  
  for (let i = 0; i < lifeStats.monthsTotal; i++) {
    let type = 'free';
    
    // Determine the type of month
    if (i < lifeStats.monthsLived) {
      type = 'past';
    } else {
      // For remaining months, assign based on proportions
      // This is simplified - a more realistic implementation would
      // distribute these throughout the remaining life more naturally
      const sleepProportion = lifeStats.sleepMonths / lifeStats.monthsTotal;
      const workProportion = lifeStats.workMonths / lifeStats.monthsTotal;
      const routineProportion = lifeStats.routineMonths / lifeStats.monthsTotal;
      const livingProportion = lifeStats.livingMonths / lifeStats.monthsTotal;
      
      const random = Math.random();
      let cumulativeProportion = 0;
      
      cumulativeProportion += sleepProportion;
      if (random < cumulativeProportion) {
        type = 'sleep';
      } else {
        cumulativeProportion += workProportion;
        if (random < cumulativeProportion) {
          type = 'work';
        } else {
          cumulativeProportion += routineProportion;
          if (random < cumulativeProportion) {
            type = 'routine';
          } else {
            cumulativeProportion += livingProportion;
            if (random < cumulativeProportion) {
              type = 'living';
            }
          }
        }
      }
    }
    
    monthsArray.push({
      index: i,
      type: type
    });
  }
  
  return monthsArray;
};
