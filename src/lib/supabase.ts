import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Sensor data types
export interface SensorReading {
  id: string;
  depth: number;
  quality: number;
  timestamp: string;
  location: string;
  village: string;
}

export interface UserProfile {
  id: string;
  name: string;
  village: string;
  water_credits: number;
}