"use client";
import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "@/lib/axiosInstance";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default function MoistureChart() {
  const [moistureData, setMoistureData] = useState<number[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/data/get");
        const moisture = response.data?.data?.moistureValues || [];
        setMoistureData(moisture);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !moistureData.length) return;

    const labels = moistureData.map((_, index) => `${index}:00`);

    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Moisture Level",
            fill: false,
            borderColor: "rgb(9, 121, 105)",
            backgroundColor: "rgba(9, 121, 105, 0.2)",
            pointBackgroundColor: "rgb(9, 121, 105)",
            pointRadius: 4,
            data: moistureData,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              align: "center",
              text: "Moisture Level (m³)",
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
              align: "center",
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
  }, [moistureData]);

  return <canvas ref={chartRef} className="w-full max-w-[70%]" />;
}
