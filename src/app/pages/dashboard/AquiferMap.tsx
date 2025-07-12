import { motion } from 'framer-motion';

const AquiferMap = () => {
  // For demo purposes, we'll use a static image
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4">Aquifer Network Map</h2>
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-gray-500 mb-2">Interactive map showing sensor locations</div>
            <div className="flex justify-center space-x-4">
              {['Sensor A', 'Sensor B', 'Sensor C'].map((sensor, index) => (
                <motion.div
                  key={sensor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white px-4 py-2 rounded-full shadow-md"
                >
                  <div className="w-3 h-3 bg-cyan-500 rounded-full inline-block mr-2"></div>
                  {sensor}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing 3 active sensors in your area
      </div>
    </motion.div>
  );
};

export default AquiferMap;