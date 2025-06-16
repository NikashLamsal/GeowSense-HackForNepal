import Link from "next/link";
import React from "react";

const Dashboard = ({ data }) => {
  const { sensor } = data || {};

  return (
    <section className="w-1/2 bg-transparent p-10 flex flex-col justify-between items-center">
      <h2 className="w-full text-2xl font-bold text-[#4caf50] mb-4 text-center">
        Dashboard Overview
      </h2>

      <div className="w-[85%] h-[85%] bg-gradient-to-br from-[#c8f0d2] to-[#e4f5e9] backdrop-blur-md border border-[#4caf50]/50 rounded-xl shadow-md flex flex-col items-center justify-center text-lg font-semibold text-black transition-all duration-300 py-6">
        {sensor ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-white rounded-lg px-6 py-4 shadow border border-[#4caf50]/30 text-center w-36">
              <p className="text-[#4caf50] font-medium">🌱 Moisture</p>
              <p className="text-xl font-bold text-gray-800">
                {sensor.moisture}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-6">
              <div className="bg-white rounded-lg px-6 py-4 shadow border border-[#4caf50]/30 text-center w-36">
                <p className="text-[#4caf50] font-medium">🌡️ Temperature</p>
                <p className="text-xl font-bold text-gray-800">
                  {sensor.temperature}°C
                </p>
              </div>
              <div className="bg-white rounded-lg px-6 py-4 shadow border border-[#4caf50]/30 text-center w-36">
                <p className="text-[#4caf50] font-medium">💧 Humidity</p>
                <p className="text-xl font-bold text-gray-800">
                  {sensor.humidity}%
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">No sensor data available.</p>
        )}
      </div>

      <Link
        href="/control"
        className="mt-10  text-white px-6 py-2 rounded-lg font-medium shadow-md bg-[#4caf50] hover:bg-[#66bb6a] transition duration-300"
      >
        Control
      </Link>
    </section>
  );
};

export default Dashboard;
