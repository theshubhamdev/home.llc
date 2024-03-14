"use client";
import React, { createContext, useState, useEffect, FC } from "react";
import { TemperatureState } from "@/types/TempratureTypes";

interface IWeatherContext {
  weatherData?: TemperatureState;
}
export const WeatherContext = createContext<IWeatherContext>({});

interface IWeatherProvider {
  children: React.ReactNode;
}

export const WeatherProvider: FC<IWeatherProvider> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<TemperatureState>();

  useEffect(() => {
    const fetchData = async (position?: GeolocationPosition) => {
      try {
        const url = position
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${position?.coords.latitude}&lon=${position?.coords.longitude}&appid=6e3f9a183a884775218c4a594bb19ab5`
          : `https://api.openweathermap.org/data/2.5/forecast?q=New Delhi&appid=6e3f9a183a884775218c4a594bb19ab5`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === "200") {
          setWeatherData(data);
        } else {
          alert("Error fetching weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchData);
    } else {
      alert("Location denied or the browser doesn't support location");
      console.log("Location denied or the browser doesn't support location");
      fetchData();
    }
    if (!weatherData) {
      fetchData();
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
