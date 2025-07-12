import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { trackPageView } from '../../../lib/analytics';

const OnboardingPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    trackPageView('Onboarding');
  }, []);

  const steps = [
    {
      title: 'Welcome to AquaSense AI',
      description: 'We help you monitor groundwater levels and optimize usage.',
      buttonText: 'Get Started',
    },
    {
      title: 'Connect Your Sensors',
      description: 'Add your Smart Well-Cap sensors to start receiving data.',
      buttonText: 'Next',
    },
    {
      title: 'Complete Your Profile',
      description: `You're all set ${user?.name || ''}! Let's start monitoring.`,
      buttonText: 'Go to Dashboard',
    },
  ];

  const currentStep = steps[step - 1];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="text-cyan-600 text-4xl" />
          </motion.div>
          
          <motion.h1 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            {currentStep.title}
          </motion.h1>
          
          <motion.p
            key={`desc-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 mb-8"
          >
            {currentStep.description}
          </motion.p>
          
          <div className="flex justify-center mb-8">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full mx-1 ${
                  i < step ? 'bg-cyan-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-md"
          >
            {currentStep.buttonText}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;