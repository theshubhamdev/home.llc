"use client";

import { WeatherContext } from "@/Contexts/WeatherContext";
import { BaseText, WeatherData, WeatherInfo } from "@/components";
import TemperatureInfo from "@/components/TemperatureInfo";
import { useContext } from "react";
import { BsClouds } from "react-icons/bs";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);
export default function Home() {
  const { weatherData } = useContext(WeatherContext);
  console.log(weatherData);

  return (
    <main>
      <div className="min-h-screen p-24 items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <BaseText>{weatherData?.city?.name || ""}</BaseText>
            <BaseText>{weatherData?.city?.country || ""}</BaseText>
            <BaseText className="text-sm text-gray-500">
              {dayjs(weatherData?.list[0].dt_txt).format("dddd, MMMM D")}
            </BaseText>
            <div className="flex flex-row items-center space-x-2">
              <BsClouds />
              <BaseText className="text-sm">
                {weatherData?.list[0].weather[0].description}
              </BaseText>
            </div>
          </div>
          <img
            alt="NY"
            className="w-1/2 rounded-2xl object-cover object-center"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"
          />
        </div>
        <div className="py-20">
          <WeatherData />
        </div>
        <div
          className="py-20"
          style={{
            borderBottom: "solid white",
            borderTop: "solid white",
            borderBottomWidth: "min(1px, 0.1em)",
            borderTopWidth: "min(1px, 0.1em)",
          }}
        >
          <WeatherInfo />
        </div>
      </div>
      <TemperatureInfo />
    </main>
  );
}
