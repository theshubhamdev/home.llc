import React, { FC, useContext } from "react";
import BaseText from "./BaseText";
import { WeatherContext } from "@/Contexts/WeatherContext";

interface WeatherInfoItemProps {
  title?: string;
  value?: string;
}
const WeatherInfoItem: FC<WeatherInfoItemProps> = ({ title, value }) => {
  return (
    <div>
      <BaseText className="text-sm text-gray-500">{title}</BaseText>
      <BaseText className="text-sm mt-2">{value}</BaseText>
    </div>
  );
};

const WeatherInfo = () => {
  const { weatherData } = useContext(WeatherContext);
  return (
    <div className="px-5">
      <BaseText className="">Additional Info</BaseText>
      <div className="flex flex-row justify-between mt-5">
        <WeatherInfoItem
          title="Precipitation"
          value={`${weatherData?.list[1].pop}%` || "0"}
        />
        <WeatherInfoItem
          title="Humidity"
          value={`${weatherData?.list[1].main.humidity}%` || "0"}
        />
        <WeatherInfoItem
          title="Windy"
          value={`${weatherData?.list[1].wind.speed}mph` || "0"}
        />
      </div>
    </div>
  );
};

export default WeatherInfo;
