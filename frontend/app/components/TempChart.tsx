'use client';
import { useEffect, useRef } from 'react';
import {
  Chart,
  BubbleController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BubbleController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function TempChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Temperature Level',
          data: [
            { x: 0, y: 50, r: 7 },
            { x: 24, y: 10, r: 7 },
          ],
          backgroundColor: 'rgb(9, 121, 105)'
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
