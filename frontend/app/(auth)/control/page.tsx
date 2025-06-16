// app/page.tsx
import React from "react";
import PumpControl from "./components/PumpControl";
import getFirebaseData from "@/lib/getFirebaseData";

const Page = async () => {
  const data = await getFirebaseData();

  // If data failed to load or sensor data is missing, show an error message
  if (!data || !data.sensor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gray-100">
        <p className="text-xl font-semibold">Error: Sensor data could not be loaded.</p>
      </div>
    );
  }

  // Render PumpControl with the sensor data
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c8f0d2] to-[#e4f5e9]">
      <PumpControl data={data.sensor} />
    </div>
  );
};

export default Page;