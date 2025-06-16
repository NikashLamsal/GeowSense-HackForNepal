"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Weather = () => {
  const URL1 = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const API_ID = "&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric";
  const city = "Kathmandu";

  const [weatherData, setWeatherData] = useState({
    temperature: "--",
    pressure: "--",
    windSpeed: "--",
    humidity: "--",
  });

  useEffect(() => {
    const fetchData = async (location: string) => {
      console.log("Fetching Data ...");
      try {
        const response = await fetch(URL1 + location + API_ID);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setWeatherData({
            temperature: Math.round(data.list[0].main.temp) + "°C",
            pressure: data.list[0].main.pressure + "Pa",
            windSpeed: data.list[0].wind.speed + " Km/h",
            humidity: data.list[0].main.humidity + " %",
          });
        } else {
          console.info("Something went wrong !");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(city);
  }, []);

  return (
    <section className="w-1/2 mt-5 bg-[#f5f5f5]/20 p-10 flex flex-wrap gap-6 justify-center items-center border-r border-[#4caf50]/30 rounded-tr-2xl rounded-br-2xl shadow-lg">
      <h2 className="w-full text-3xl font-bold text-[#4caf50] mb-6 text-center">
        Weather Insights
      </h2>
      {[
        {
          src: "/temperature-icon.svg",
          label: "Temperature",
          value: weatherData.temperature,
        },
        {
          src: "/humidity.svg",
          label: "Humidity",
          value: weatherData.humidity,
        },
        { src: "/wind.svg", label: "Wind Speed", value: weatherData.windSpeed },
        {
          src: "/pressure.svg",
          label: "Pressure",
          value: weatherData.pressure,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="w-[45%] h-[40%] bg-gradient-to-br from-[#c8f0d2] to-[#e4f5e9] backdrop-blur-md rounded-xl border border-[#4caf50]/50 shadow-md flex flex-col justify-center items-center gap-3 p-4"
        >
          <Image
            src={item.src}
            alt="icon"
            width={50}
            height={50}
            className="filter brightness-110"
          />
          <div className="text-base font-medium text-black">{item.label}</div>
          <div className="text-xl font-bold text-[#4caf50]">{item.value}</div>
        </div>
      ))}
    </section>
  );
};

export default Weather;
