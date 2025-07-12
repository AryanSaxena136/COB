import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, SensorReading } from 'C:/Users/Aryan/aquasense-ai/src/lib/supabase';
import { toast } from 'react-hot-toast';

type SensorContextType = {
  sensorData: SensorReading[];
  loading: boolean;
  forecastData: any[];
  addWaterCredits: (amount: number) => void;
};

const SensorContext = createContext<SensorContextType>({
  sensorData: [],
  loading: true,
  forecastData: [],
  addWaterCredits: () => {},
});

export const SensorProvider = ({ children }: { children: React.ReactNode }) => {
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      // Sample data for demo
      const res = await fetch('/sensors.json');
      const data = await res.json();
      setSensorData(data);
      setLoading(false);
    };

    fetchInitialData();

    // Set up real-time subscription
    const subscription = supabase
      .from('sensor_readings')
      .on('INSERT', (payload) => {
        setSensorData((prev) => [payload.new, ...prev.slice(0, 49)]);
        trackEvent('sensor_update');
      })
      .subscribe();

    // Generate forecast data
    const forecast = Array.from({ length: 6 }, (_, i) => ({
      month: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }),
      level: Math.max(0, 45 - i * 3 + (Math.random() * 4 - 2)),
      recharge: Math.round(15 + Math.random() * 20),
    }));
    setForecastData(forecast);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addWaterCredits = (amount: number) => {
    toast.success(`+${amount} Water Credits earned!`);
    trackEvent('water_credit_earned', { amount });
  };

  return (
    <SensorContext.Provider value={{ sensorData, loading, forecastData, addWaterCredits }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorData = () => useContext(SensorContext);