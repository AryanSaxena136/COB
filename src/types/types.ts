export type SensorReading = {
  id: string;
  depth: number;
  quality: number;
  timestamp: string;
  location: string;
  village: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  village: string;
  water_credits: number;
};

export type ForecastData = {
  month: string;
  level: number;
  recharge: number;
};