import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50' 
    : 'flex items-center justify-center py-8';

  return (
    <div className={containerClass}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-t-4 border-cyan-600 border-solid rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;