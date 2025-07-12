import { motion } from 'framer-motion';
import { useSensorData } from '../../../context/SensorContext';

const RealtimeGauge = () => {
  const { sensorData } = useSensorData();
  const latest = sensorData[0] || { depth: 45, quality: 7.2 };
  
  // Calculate danger levels
  const depthPercentage = Math.min(100, Math.max(0, (latest.depth / 60) * 100));
  const qualityColor = latest.quality > 8 ? 'text-emerald-500' : 
                      latest.quality > 6 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Current Aquifer Status</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="font-medium mb-2">Water Depth</h3>
          <div className="relative h-48">
            {/* Water level visualization */}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg overflow-hidden">
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: `${depthPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700" />
            </div>
            
            {/* Depth markers */}
            <div className="absolute top-0 left-4 text-xs text-gray-500">0m</div>
            <div className="absolute top-1/2 left-4 text-xs text-gray-500">30m</div>
            <div className="absolute bottom-0 left-4 text-xs text-gray-500">60m</div>
            
            {/* Current depth indicator */}
            <motion.div 
              className="absolute left-0 right-0 flex justify-center"
              initial={{ bottom: 0 }}
              animate={{ bottom: `${depthPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="bg-white px-3 py-1 rounded-full shadow-md border border-blue-200 -mt-3">
                <span className="font-bold text-blue-600">{latest.depth.toFixed(1)}m</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-2">Water Quality</h3>
          <div className="flex items-center justify-center h-48">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <span className={`text-4xl font-bold ${qualityColor}`}>
                  {latest.quality.toFixed(1)}
                </span>
              </div>
              <div className="absolute top-0 right-0 text-xs text-gray-500">10</div>
              <div className="absolute bottom-0 left-0 text-xs text-gray-500">0</div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500">pH</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default RealtimeGauge;