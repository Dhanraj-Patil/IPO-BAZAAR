import React from 'react';

const IPOTimeline = ({ ipoSchedule }) => {
  if (!ipoSchedule) return null;
  
  const today = new Date();

  const getDateFromString = (dateStr) => {
    if (dateStr.includes('(')) {
      dateStr = dateStr.split('(')[0].trim();
    }
    return new Date(dateStr);
  };

  const isDatePassed = (dateStr) => {
    const eventDate = getDateFromString(dateStr);
    return today >= eventDate;
  };

  const findProgressPercentage = () => {
    const entries = Object.entries(ipoSchedule);
    const totalSteps = entries.length;
    
    let completedSteps = 0;
    for (let [_, date] of entries) {
      if (isDatePassed(date)) {
        completedSteps++;
      } else {
        break;
      }
    }
    
    return (completedSteps / totalSteps) * 100;
  };

  const progressHeight = `${findProgressPercentage()}%`;

  return (
    <div className="w-full  mx-auto p-6 bg-[#111822] rounded-2xl ">
        <p className='text-center text-2xl font-semibold uppercase '>Ipo Schedule</p>
        <br />
      <div className="relative">
        {/* Background vertical line */}
        <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-700"/>
        
        {/* Progress vertical line */}
        <div 
          className="absolute left-2 top-0 w-0.5 bg-[#B0FA04] transition-all duration-500 shadow-[0_0_8px_rgba(176,250,4,0.5)]"
          style={{ height: progressHeight }}
        />
        
        <div className="space-y-3">
          {Object.entries(ipoSchedule).map(([key, value]) => {
            const passed = isDatePassed(value);
            const isLockIn = key.toLowerCase().includes('lock-in');
            
            return (
              <div key={key} className="flex items-center gap-4 group">
                {/* Timeline dot */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isLockIn 
                      ? 'border-gray-600 bg-gray-700' 
                      : passed 
                        ? 'border-[#B0FA04] bg-[#B0FA04] shadow-[0_0_8px_rgba(176,250,4,0.5)]'
                        : 'border-[#B0FA04] bg-transparent'
                  }`}
                />
                
                {/* Content */}
                <div className="flex flex-1 justify-between items-center py-2 px-4 rounded-lg
                             transition-all duration-300 group-hover:bg-slate-800/50">
                  <span className={`text-sm ${
                    isLockIn ? 'text-gray-500' : 'text-gray-200'
                  }`}>
                    {key}
                  </span>
                  <span className={`text-sm ${
                    isLockIn ? 'text-gray-500' : 'text-[#B0FA04]'
                  }`}>
                    {value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IPOTimeline;