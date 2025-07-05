import React from 'react';

export const AnalyticsChart = ({ data, metric }) => {
  const maxValue = Math.max(...data.map(d => d[metric]));
  const minValue = Math.min(...data.map(d => d[metric]));
  const range = maxValue - minValue;

  const formatValue = (value) => {
    if (metric === 'revenue') return `$${(value / 1000).toFixed(1)}K`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const getColor = () => {
    switch (metric) {
      case 'followers': return 'stroke-blue-500 fill-blue-500';
      case 'views': return 'stroke-purple-500 fill-purple-500';
      case 'revenue': return 'stroke-green-500 fill-green-500';
      default: return 'stroke-blue-500 fill-blue-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
        {metric} Analytics
      </h3>
      
      <div className="h-48 sm:h-64 relative overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart line */}
          <path
            d={`M ${data.map((item, index) => 
              `${(index * 400) / (data.length - 1)},${200 - ((item[metric] - minValue) / range) * 180}`
            ).join(' L ')}`}
            fill="none"
            className={`${getColor()} stroke-2`}
            strokeWidth="3"
          />
          
          {/* Chart area */}
          <path
            d={`M ${data.map((item, index) => 
              `${(index * 400) / (data.length - 1)},${200 - ((item[metric] - minValue) / range) * 180}`
            ).join(' L ')} L 400,200 L 0,200 Z`}
            className={`${getColor()} opacity-20`}
          />
          
          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={(index * 400) / (data.length - 1)}
              cy={200 - ((item[metric] - minValue) / range) * 180}
              r="4"
              className={`${getColor()} stroke-white`}
              strokeWidth="2"
            />
          ))}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8 sm:-ml-12">
          <span>{formatValue(maxValue)}</span>
          <span>{formatValue(minValue + range * 0.5)}</span>
          <span>{formatValue(minValue)}</span>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400 overflow-hidden">
        {data.map((item, index) => (
          <span key={index} className={`${index % 2 === 0 ? 'block' : 'hidden sm:block'} truncate`}>
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
    </div>
  );
};