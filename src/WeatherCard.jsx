import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { FaSun, FaMoon, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaTemperatureHigh, FaWind, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C'); 
  const [loading, setLoading] = useState(true);

  const API_ENDPOINT = "https://jga3fepo7qocaxxvhuqxtflj4a0jutbn.lambda-url.us-east-1.on.aws/";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`${API_ENDPOINT}?lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setWeather(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      });
    }
  }, []);

  const toggleUnit = () => setUnit(unit === 'C' ? 'F' : 'C');

  const getTemp = (tempC) => {
    return unit === 'C' ? Math.round(tempC) : Math.round((tempC * 9/5) + 32);
  };

  // Dynamic Backgrounds based on weather condition codes
  const getGradient = (id) => {
    if (id >= 200 && id < 300) return "from-gray-900 to-purple-900"; // Thunderstorm
    if (id >= 300 && id < 600) return "from-blue-700 to-blue-900"; // Rain
    if (id >= 600 && id < 700) return "from-blue-100 to-gray-200 text-gray-800"; // Snow
    if (id === 800) return "from-orange-400 to-rose-500"; // Clear
    return "from-gray-700 to-gray-900"; // Clouds/Default
  };

  // Helper to get the correct icon component
  const getWeatherIcon = (weatherCode, iconString) => {
    // Check if it's night time (OpenWeatherMap icon ends in 'n')
    const isNight = iconString.includes('n');

    if (weatherCode >= 200 && weatherCode < 300) return <FaBolt className="text-yellow-400" />;
    if (weatherCode >= 300 && weatherCode < 600) return <FaCloudRain className="text-blue-400" />;
    if (weatherCode >= 600 && weatherCode < 700) return <FaSnowflake className="text-white" />;
    if (weatherCode === 800) {
      // Clear Sky: Show Moon at night, Sun at day
      return isNight ? <FaMoon className="text-yellow-100" /> : <FaSun className="text-yellow-400" />;
    }
    return <FaCloud className="text-gray-300" />; // Default to clouds
  };

  if (loading) return <div className="text-white animate-pulse">Triangulating location...</div>;

  const bgGradient = getGradient(weather.weather[0].id);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* 3D Tilt Wrapper */}
      <Tilt 
        tiltMaxAngleX={10} 
        tiltMaxAngleY={10} 
        perspective={1000} 
        scale={1.05}
        transitionSpeed={450}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareColor="#ffffff"
        glarePosition="all"
        className="w-full max-w-md"
      >
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${bgGradient} p-8 shadow-2xl border border-white/20 backdrop-blur-md`}>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-start text-white">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaMapMarkerAlt /> {weather.name}
              </h2>
              <p className="text-sm opacity-80 capitalize">{weather.weather[0].description}</p>
            </div>
            <div className="text-6xl filter drop-shadow-lg">
              {getWeatherIcon(weather.weather[0].id, weather.weather[0].icon)}
            </div>
          </div>

          {/* Main Temperature */}
          <div className="relative z-10 my-8 text-center text-white">
            <h1 className="text-8xl font-black tracking-tighter drop-shadow-xl">
              {getTemp(weather.main.temp)}°
            </h1>
            <button 
              onClick={toggleUnit}
              className="mt-2 px-4 py-1 rounded-full border border-white/30 text-xs font-bold hover:bg-white/20 transition"
            >
              Switch to °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>

          {/* Grid Stats (Data Structure style) */}
          <div className="relative z-10 grid grid-cols-3 gap-2 mt-4">
            <StatBox icon={<FaTint />} label="Humidity" value={`${weather.main.humidity}%`} />
            <StatBox icon={<FaWind />} label="Wind" value={`${weather.wind.speed} m/s`} />
            <StatBox icon={<FaTemperatureHigh />} label="Feels Like" value={`${getTemp(weather.main.feels_like)}°`} />
          </div>
          
        </div>
      </Tilt>
    </div>
  );
};

// Reusable mini-component for stats
const StatBox = ({ icon, label, value }) => (
  <div className="flex flex-col items-center p-3 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
    <div className="text-white text-lg mb-1">{icon}</div>
    <span className="text-white/60 text-[10px] uppercase tracking-wider">{label}</span>
    <span className="text-white font-bold text-sm">{value}</span>
  </div>
);

export default WeatherCard;