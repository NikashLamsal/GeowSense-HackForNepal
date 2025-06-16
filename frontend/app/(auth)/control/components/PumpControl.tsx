"use client";

import { useEffect, useState } from "react";

interface SensorData {
  temperature: number;
  humidity: number;
  moisture: number;
}

interface ControlData {
  mode: "AUTO" | "MANUAL";
  pump: "ON" | "OFF";
}

interface DataResponse {
  sensor: SensorData;
  control: ControlData;
  status: {
    lastSeen: number;
  };
}

export default function PumpControl() {
  const [data, setData] = useState<DataResponse | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:8000/data");
      const result: DataResponse = await res.json();
      setData(result);
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const setMode = async (mode: "AUTO" | "MANUAL") => {
    try {
      await fetch("http://localhost:8000/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      setData((prev) =>
        prev ? { ...prev, control: { ...prev.control, mode } } : prev
      );
    } catch (e) {
      console.error("Failed to update mode", e);
    }
  };

  const setPump = async (pump: "ON" | "OFF") => {
    try {
      await fetch("http://localhost:8000/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pump }),
      });
      setData((prev) =>
        prev ? { ...prev, control: { ...prev.control, pump } } : prev
      );
    } catch (e) {
      console.error("Failed to update pump", e);
    }
  };

  useEffect(() => {
    loadData();
    // Optionally, refresh data every 10 seconds:
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-['Roboto'] text-[#2e7d32] px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">GrowSense Pump Control</h1>

      <div className="relative bg-[#f1f8f2] border border-[#c8e6c9] rounded-2xl p-6 w-full max-w-xl shadow-md flex justify-center items-center text-2xl font-bold mb-8">
        ESP 32
        <div
          className={`absolute right-5 w-6 h-6 rounded-full border-2 ${
            Date.now() / 1000 - data.status.lastSeen < 60
              ? "bg-[#4caf50] border-[#4caf50] shadow-[0_0_10px_4px_rgba(76,175,80,0.8)]"
              : "bg-[#f44336] border-[#f44336] shadow-[0_0_10px_4px_rgba(244,67,54,0.8)]"
          }`}
        ></div>
      </div>

      <div className="bg-white border border-[#c8e6c9] rounded-2xl p-8 w-full max-w-xl shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Sensor Data</h2>
          <p>
            Temperature:{" "}
            <span className="font-semibold">
              {data.sensor.temperature.toFixed(1)} °C
            </span>
          </p>
          <p>
            Humidity:{" "}
            <span className="font-semibold">{data.sensor.humidity.toFixed(1)} %</span>
          </p>
          <p>
            Soil Moisture:{" "}
            <span className="font-semibold">{data.sensor.moisture}</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Pump Control</h2>

        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="AUTO"
              checked={data.control.mode === "AUTO"}
              onChange={() => setMode("AUTO")}
            />
            Automatic
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="MANUAL"
              checked={data.control.mode === "MANUAL"}
              onChange={() => setMode("MANUAL")}
            />
            Manual
          </label>
        </div>

        {data.control.mode === "MANUAL" && (
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => setPump("ON")}
              className="bg-[#2e7d32] text-white px-6 py-3 rounded-full shadow hover:bg-green-800 transition"
            >
              Pump ON
            </button>
            <button
              onClick={() => setPump("OFF")}
              className="bg-[#2e7d32] text-white px-6 py-3 rounded-full shadow hover:bg-green-800 transition"
            >
              Pump OFF
            </button>
          </div>
        )}

        <div className="mt-4 text-sm">
          <p>
            Current Mode: <span className="font-semibold">{data.control.mode}</span>
          </p>
          <p>
            Pump Status: <span className="font-semibold">{data.control.pump}</span>
          </p>
        </div>
      </div>
    </div>
  );
}