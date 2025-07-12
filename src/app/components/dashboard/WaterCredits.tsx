import { motion } from 'framer-motion';
import { useSensorData } from '../../../context/SensorContext';

const WaterCredits = () => {
  const { addWaterCredits } = useSensorData();
  const [credits, setCredits] = useState(120);
  
  const actions = [
    { title: 'Share Well Data', credits: 5, icon: '📊' },
    { title: 'Install Contour Bunding', credits: 20, icon: '🌾' },
    { title: 'Report Water Waste', credits: 10, icon: '🚱' },
    { title: 'Attend Workshop', credits: 15, icon: '🎓' },
  ];

  const handleAction = (creditAmount: number) => {
    setCredits(credits + creditAmount);
    addWaterCredits(creditAmount);
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-2">Water Credits Program</h2>
      <p className="mb-4 opacity-90">Earn credits by conserving groundwater</p>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-5xl font-bold">{credits}</div>
        <div className="text-right">
          <div className="text-sm opacity-80">Current Tier</div>
          <div className="text-xl font-bold">Aqua Guardian</div>
        </div>
      </div>
      
      <h3 className="font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-left hover:bg-opacity-30 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(action.credits)}
          >
            <div className="text-2xl mb-1">{action.icon}</div>
            <div className="font-medium">{action.title}</div>
            <div className="text-sm mt-1">+{action.credits} credits</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};