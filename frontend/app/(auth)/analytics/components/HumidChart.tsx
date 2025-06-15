'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// ✅ Register bar chart components
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
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'bar', // ✅ This now works
      data: {
        labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        datasets: [
          {
            label: 'Moisture Level',
            backgroundColor: 'rgba(92, 177, 46, 0.61)',
            borderColor: 'rgb(9, 121, 105)',
            data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => chart.destroy(); // ✅ Prevent memory leaks
  }, []);

  return <canvas ref={chartRef} className="w-full max-w-[70%]" />;
}
