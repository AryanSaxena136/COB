import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import RealtimeGauge from '../../components/dashboard/RealtimeGauge';
import ForecastChart from '../../components/dashboard/ForecastChart';
import WaterCredits from '../../components/dashboard/WaterCredits';
import AquiferMap from '../../components/dashboard/AquiferMap';
import { trackPageView } from '../../../lib/analytics';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      trackPageView('Dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Groundwater Monitoring Dashboard</h1>
            <p className="text-gray-600">
              Real-time aquifer data for {user?.village || 'your village'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RealtimeGauge />
            </div>
            <div>
              <WaterCredits />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ForecastChart />
            <AquiferMap />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;