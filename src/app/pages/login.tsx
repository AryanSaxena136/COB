import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { trackPageView } from '../../lib/analytics';

const LoginPage = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView('Login');
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">AquaSense AI</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <LoginForm onSubmit={handleLogin} error={error} />
        <div className="text-center">
          <button 
            onClick={() => router.push('/signup')}
            className="text-cyan-600 hover:text-cyan-800 font-medium"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;