import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedCounter = ({ value }: { value: number }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
  }, [value, controls]);

  return (
    <motion.span 
      animate={controls}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
};

export default AnimatedCounter;