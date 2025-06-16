"use client";
import { useEffect, useRef, useState } from "react";
import {
  Chart,
  BubbleController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import axiosInstance from "@/lib/axiosInstance";

Chart.register(
  BubbleController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export default function TempChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [temperatureValues, setTemperatureValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/data/get");
        const tempData = response.data?.data?.temperatureValues || [];
        setTemperatureValues(tempData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !temperatureValues.length) return;

    const bubbleData = temperatureValues.map((temp, index) => ({
      x: index, // Hour of the day
      y: temp, // Temperature value
      r: 7, // Radius of each bubble (static)
    }));

    const chart = new Chart(chartRef.current, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Temperature Level",
            data: bubbleData,
            backgroundColor: "rgb(9, 121, 105)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              align: "center",
              text: "Time (hours)",
              color: "#212121",
              font: {
                family: "Arial",
                size: 14,
              },
            },
            min: 0,
            max: 24,
            ticks: {
              stepSize: 1,
            },
          },
          y: {
            title: {
              display: true,
              align: "center",
              text: "Temperature Level (°C)",
              color: "#212121",
              font: {
                family: "Arial",
                size: 14,
              },
            },
            beginAtZero: true,
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
  }, [temperatureValues]);

  return <canvas ref={chartRef} className="w-full max-w-[70%]" />;
}
