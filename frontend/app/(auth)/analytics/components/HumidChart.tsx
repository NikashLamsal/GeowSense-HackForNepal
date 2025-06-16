"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import axiosInstance from "@/lib/axiosInstance";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function HumidChart() {
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/data/get");
        const humidity = response.data?.data?.humidityValues || [];
        setHumidityData(humidity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !humidityData.length) return;

    const labels = humidityData.map((_, index) => `${index}:00`);

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Humidity Level (%)",
            backgroundColor: "rgba(92, 177, 46, 0.61)",
            borderColor: "rgb(9, 121, 105)",
            borderWidth: 1,
            data: humidityData,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: "Humidity Level (%)",
              color: "#212121",
              font: {
                family: "Arial",
                size: 14,
              },
            },
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: "Time (Hours)",
              color: "#212121",
              font: {
                family: "Arial",
                size: 14,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [humidityData]);

  return <canvas ref={chartRef} className="w-full max-w-[70%]" />;
}
