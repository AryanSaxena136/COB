import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ForecastChart = () => {
  const { forecastData } = useSensorData();
  
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">6-Month Aquifer Forecast</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={forecastData}>
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value) => [`${value}m`, 'Depth']}
              labelFormatter={(month) => `Month: ${month}`}
            />
            <Bar 
              dataKey="level" 
              fill="#3b82f6" 
              name="Water Level"
              animationDuration={2000}
            />
            <Bar 
              dataKey="recharge" 
              fill="#10b981" 
              name="Recharge Potential"
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 mr-2"></div>
          <span>Projected Water Level</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 mr-2"></div>
          <span>Recharge Potential (%)</span>
        </div>
      </div>
    </motion.div>
  );
};