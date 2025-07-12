import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Smart Groundwater Monitoring for <span className="text-cyan-600">Farmers</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-10"
            >
              AquaSense AI helps farmers monitor aquifer levels, predict water availability, and earn rewards for conservation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => router.push('/signup')}
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none"
              >
                Get Started
                <FiArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-cyan-500 p-6 rounded-2xl shadow-lg text-white">
              <div className="text-2xl font-bold">+15%</div>
              <div className="text-sm">Average Crop Yield Increase</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}