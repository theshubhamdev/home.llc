"use client";
import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { WeatherContext } from "@/Contexts/WeatherContext";
import BaseText from "./BaseText";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const TemperatureInfo = () => {
  const { weatherData } = useContext(WeatherContext);

  const [timeline, setTimeline] = useState(7);
  const data = {
    labels:
      weatherData?.list
        ?.map((day) => day.dt_txt)
        .filter((_, i) => i < Number(timeline)) || [],
    datasets: [
      {
        label: "Wind Speed",
        data:
          weatherData?.list
            .filter((v) => v)
            ?.map((day) => day.main.feels_like)
            .filter((_, i) => Number(timeline)) || [],
        fill: true,
        backgroundColor: "#ffa136",
        borderWidth: 0,
        lineTension: 0.3,
      },
      {
        label: "Humidity",
        data:
          weatherData?.list
            .filter((v) => v)
            ?.map((day) => day.main.temp_max)
            .filter((_, i) => i < Number(timeline)) || [],
        fill: true,
        backgroundColor: "#ffd9b1",
        borderWidth: 0,
        lineTension: 0.3,
      },
    ],
  };
  return (
    <div>
      <div className="flex flex-row  justify-between px-20">
        <BaseText>Temperature</BaseText>
        <select
          name="timeline"
          id="timeline"
          value={timeline}
          onChange={(e) => setTimeline(Number(e.target.value))}
        >
          <option value="7">last 7 days</option>
          <option value="10">last 10 days</option>
          <option value="15">last 10 days</option>
          <option value="30">last 30 days</option>
        </select>
      </div>

      <Line
        data={data}
        /* Options to give a spline effect */
        options={{
          responsive: true,
          scales: {
            x: {
              display: false, // Hide x-axis
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.label + "res"; // Display wind speed values in tooltips
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TemperatureInfo;
