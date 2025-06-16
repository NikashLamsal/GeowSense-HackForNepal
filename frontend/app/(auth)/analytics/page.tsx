import ChartSection from "@/app/(auth)/analytics/components/ChartSection";
import MoistureChart from "@/app/(auth)/analytics/components/MoistureChart";
import TempChart from "@/app/(auth)/analytics/components/TempChart";
import HumidChart from "@/app/(auth)/analytics/components/HumidChart";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <ChartSection chartPosition="left" chartComponent={<MoistureChart />}>
          <h1 className="text-2xl font-semibold text-[#10b981] text-center">💧 Soil Moisture</h1>
          <p>
            Soil moisture is critical for plant water uptake and nutrient transport. Low moisture can stress plants, reduce growth, and lower yields, while optimal moisture supports healthy roots and crop development.
          </p>
          <p className="font-medium text-lg">- Reference Moisture Range (24 hrs, Max 4095 m³):</p>
          <ul className="list-disc list-inside">
            <li><span className="font-semibold text-red-600">High:</span> Below 1000 (Dry soil)</li>
            <li><span className="font-semibold text-green-500">Optimal:</span> 1000 - 3000 (Well-irrigated) </li>
            <li><span className="font-semibold text-yellow-600">Dry:</span> 3000 - 4095 </li>
          </ul>
        </ChartSection>

        <ChartSection chartPosition="right" chartComponent={<TempChart />}>
          <h1 className="text-2xl font-semibold text-[#10b981] text-center">🌡️ Temperature</h1>
          <p>
            Temperature plays a crucial role in crop growth. Extreme heat can cause stress, reduce photosynthesis, and affect flowering. Mild temperatures promote healthy growth, nutrient absorption, and high yield.
          </p>
          <p className="font-medium text-lg">- Reference Temperature Range (24 hrs, Max 50°C):</p>
          <ul className="list-disc list-inside">
            <li><span className="font-semibold text-red-600">Worst:</span> Above 40°C</li>
            <li><span className="font-semibold text-yellow-500">Moderate:</span> 30°C - 40°C</li>
            <li><span className="font-semibold text-green-600">Best:</span> 20°C - 30°C</li>
          </ul>
        </ChartSection>

        <ChartSection chartPosition="left" chartComponent={<HumidChart />}>
          <h1 className="text-2xl font-semibold text-[#10b981] text-center">💧 Humidity</h1>
          <p>
            Humidity affects plant transpiration and water use efficiency. Low humidity can increase water loss and stress, while high humidity helps maintain hydration but may increase disease risk.
          </p>
          <p className="font-medium text-lg">- Reference Humidity Range (24 hrs, Max 50%):</p>
          <ul className="list-disc list-inside">
            <li><span className="font-semibold text-red-600">Low:</span> Below 15%</li>
            <li><span className="font-semibold text-yellow-500">Moderate:</span> 15% - 35%</li>
            <li><span className="font-semibold text-green-600">Optimal:</span> 35% - 50%</li>
          </ul>
        </ChartSection>

      </div>
    </main>
  );
}
