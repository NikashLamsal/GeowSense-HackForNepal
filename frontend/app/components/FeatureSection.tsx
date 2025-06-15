import Image from "next/image";

export default function FeatureSection() {
  return (
    <div className="py-16 text-center bg-[#EDEADE]">
      <div className="container mx-auto">
        <h2 className="text-[2.5rem] font-bold text-[#2c3e50] mb-10">
          Tools to Grow Your Farm
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "/crop-icon.png",
              title: "Crop Management",
              desc: "Monitor soil health, track crop growth, and optimize yields with real-time data.",
            },
            {
              icon: "/market-icon.png",
              title: "Market Insights",
              desc: "Stay ahead with live market prices and trends for your crops.",
            },
            {
              icon: "/weather-icon.gif",
              title: "Weather Updates",
              desc: "Get accurate, localized weather forecasts to plan planting and harvesting.",
            },
            {
              icon: "/community-icon.gif",
              title: "Community & Resources",
              desc: "Access expert advice, farming tips, and connect with a community of growers.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-lg shadow-md hover:-translate-y-1 transition-transform"
            >
              <Image
                src={f.icon}
                alt={f.title + " Icon"}
                width={200}
                height={200}
                className="w-[60px] h-[60px] mb-4 mx-auto"
              />
              <h3 className="text-[#28a745] text-[1.5rem] mb-2">{f.title}</h3>
              <p className="text-[#555] text-[1rem] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
