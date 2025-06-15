"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Page = () => {
  const URL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  const API_ID = '&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric';
  const city = 'Kathmandu';

  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    pressure: '--',
    windSpeed: '--',
    humidity: '--'
  });

  useEffect(() => {
    const fetchData = async (location: string) => {
      console.log('Fetching Data ...');
      try {
        const response = await fetch(URL1 + location + API_ID);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setWeatherData({
            temperature: Math.round(data.list[0].main.temp) + '°C',
            pressure: data.list[0].main.pressure + 'Pa',
            windSpeed: data.list[0].wind.speed + ' Km/h',
            humidity: data.list[0].main.humidity + ' %'
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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#ffffff] font-sans text-white">
      <main className="min-h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <section className="w-1/2 mt-5 bg-[#f5f5f5]/20 p-10 flex flex-wrap gap-6 justify-center items-center border-r border-[#4caf50]/30 rounded-tr-2xl rounded-br-2xl shadow-lg">
            <h2 className="w-full text-3xl font-bold text-[#4caf50] mb-6 text-center">Weather Insights</h2>
            {[
              { src: '/temperature-icon.svg', label: 'Temperature', value: weatherData.temperature },
              { src: '/humidity.svg', label: 'Humidity', value: weatherData.humidity },
              { src: '/wind.svg', label: 'Wind Speed', value: weatherData.windSpeed },
              { src: '/pressure.svg', label: 'Pressure', value: weatherData.pressure },
            ].map((item, i) => (
              <div
                key={i}
                className="w-[45%] h-[40%] bg-gradient-to-br from-[#c8f0d2] to-[#e4f5e9] backdrop-blur-md rounded-xl border border-[#4caf50]/50 shadow-md flex flex-col justify-center items-center gap-3 p-4"
              >
                <Image src={item.src} alt="icon" width={50} height={50} className="filter brightness-110" />
                <div className="text-base font-medium text-black">{item.label}</div>
                <div className="text-xl font-bold text-[#4caf50]">{item.value}</div>
              </div>
            ))}
          </section>

          <section className="w-1/2 bg-transparent p-10 flex flex-col justify-between items-center">
            <h2 className="w-full text-2xl font-bold text-[#4caf50] mb-4 text-center">Dashboard Overview</h2>
            <div className="w-[85%] h-[85%] bg-gradient-to-br from-[#c8f0d2] to-[#e4f5e9] backdrop-blur-md border border-[#4caf50]/50 rounded-xl shadow-md flex flex-col items-center justify-center text-lg font-semibold text-black transition-all duration-300">
              <p>Dashboard Content</p>
            </div>
            <a href="#" className="mt-10 bg-[#4caf50] text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-[#66bb6a] transition duration-300">
              Control
            </a>
          </section>
        </div>

        <div className="p-10 bg-[#f8f9fa] border-t border-[#4caf50]/20 shadow-inner">
          <div className="max-w-5xl mx-auto relative rounded-xl bg-white shadow-lg p-8">
            <div className="absolute top-4 right-4">
              <Image src="/bulb.svg" alt="bulb" width={40} height={40} />
            </div>
            <textarea
              readOnly
              placeholder="AI Suggestions will appear here..."
              className="w-full bg-[#f1f3f4] border border-none rounded-lg shadow-sm p-5 text-[#333] placeholder-[#888] focus:outline-none transition duration-300"
            >
            </textarea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
