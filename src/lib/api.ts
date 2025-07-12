// Weather API Integration
export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    return await response.json();
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
};

// Soil Data API Integration
export const fetchSoilData = async (location: string) => {
  try {
    // Mock API call for demo
    return {
      soilType: 'Loamy Sand',
      infiltrationRate: '15 mm/hr',
      moisture: '32%',
    };
  } catch (error) {
    console.error('Soil API error:', error);
    return null;
  }
};