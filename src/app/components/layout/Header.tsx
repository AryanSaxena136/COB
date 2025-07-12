import { useRouter } from 'next/router';
import { useAuth } from 'C:/Users/Aryan/aquasense-ai/src/context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Safely get user's display name or email
  const getUserDisplay = () => {
    if (!user) return 'Guest';
    
    // Check if user has name property (from profile)
    if (user.user_metadata?.name) return user.user_metadata.name;
    
    // Fallback to email
    if (user.email) return user.email;
    
    // If no identifiable info, use generic
    return 'User';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="text-2xl font-bold text-cyan-600 cursor-pointer"
                onClick={() => router.push(user ? '/dashboard' : '/')}
              >
                AquaSense AI
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center text-sm font-medium text-gray-700">
                  <FiUser className="mr-2" />
                  Welcome, {getUserDisplay()}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Login
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/signup')}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;