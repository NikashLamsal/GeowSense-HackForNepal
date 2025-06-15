'use client';
import { useEffect, useRef } from 'react';
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
} from 'chart.js';

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

export default function PredictionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        datasets: [{
          label: 'Moisture Level',
          backgroundColor: 'rgba(92, 177, 46, 0.61)',
          fill: false,
          borderColor: 'rgb(9, 121, 105)',
          data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
        }],
      },
      options: {
        responsive: true,
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} className="w-full max-w-[70%]" />;
}
