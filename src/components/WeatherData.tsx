"use client";
import React, { FC, useContext, useState } from "react";
import BaseText from "./BaseText";
import { BsClouds } from "react-icons/bs";
import { WeatherContext } from "@/Contexts/WeatherContext";
import { TemperatureState } from "@/types/TempratureTypes";
import dayjs from 'dayjs'

interface TimeWeatherItemProps {
  active?: boolean;
  onPress?: () => void;
  data: TemperatureState["list"][0];
}

const TimeWeatherItem: FC<TimeWeatherItemProps> = ({
  active = false,
  onPress,
  data,
}) => {
  return (
    <div
      style={{ backgroundColor: active ? "#0a3940" : "#003339" }}
      className="flex flex-col items-center space-x-1  rounded-3xl p-2"
      onClick={onPress}
    >
      <BaseText className="text-xs text-white">
        {/* Code to format in the format Today, 7:30PM */}
        {/* {dayjs(data.dt_txt).isToday() ? "Today, " : "Tomorrow, "} */}
        {dayjs(data.dt_txt).format("h A")}
      </BaseText>
      <BsClouds className="text-white" />
      <BaseText className="text-sm text-white">
        {(data?.main?.temp - 273).toFixed(0) || ""}
      </BaseText>
    </div>
  );
};

const WeatherData = () => {
  const [active, setActive] = useState(0);
  const { weatherData } = useContext(WeatherContext);

  const data = weatherData?.list.filter((w, i) => i < 5);
  return (
    <div
      style={{ backgroundColor: "#003339" }}
      className="flex mx-5 flex-row flex-wrap items-center justify-around rounded-xl px-2 py-1 shadow-md bg-blue-600"
    >
      {data?.map((item, index) => (
        <TimeWeatherItem
          data={item}
          key={index}
          active={active === index}
          onPress={() => setActive(index)}
        />
      ))}
    </div>
  );
};

export default WeatherData;
