"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("City is required");
      setWeather(null);
      return;
    }
    setError("");
    try {
   const res = await fetch(`https://weather-app-backend-depa.onrender.com/weather?city=${city}`);

      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || "Error fetching weather");
        setWeather(null);
      }
    } catch {
      setError("Server error");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-700 via-blue-500 to-indigo-400 text-white">

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">🌤 Weather Dashboard</h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-200"
          >
            Get Weather
          </button>

          {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
          {weather && (
  <div className="mt-6 bg-white/20 rounded-lg p-5 shadow-md text-black">
    <h2 className="text-2xl font-bold">{weather.name}</h2>
    <p className="text-lg mt-2">
      🌡 Temperature: <span className="font-semibold">{weather.main.temp}°C</span>
    </p>
    <p className="capitalize mt-1">
      ☁ Condition: {weather.weather[0].description}
    </p>
  </div>
)}


        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 text-center p-3 text-sm">
        © 2025 Naga Mahesh Kona. All rights reserved.
      </footer>
    </div>
  );
}
