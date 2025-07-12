import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/auth/SignupForm';
import { trackPageView } from '../../lib/analytics';

const SignupPage = () => {
  const { user, signup } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView('Signup');
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleSignup = async (email: string, password: string, name: string, village: string) => {
    try {
      await signup(email, password, name, village);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join AquaSense AI to monitor your groundwater</p>
        </div>
        <SignupForm onSubmit={handleSignup} error={error} />
        <div className="text-center">
          <button 
            onClick={() => router.push('/login')}
            className="text-cyan-600 hover:text-cyan-800 font-medium"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;