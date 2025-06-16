import React from "react";
import Image from "next/image";
import Footer from "@/app/(auth)/components/Footer";

const Support = () => {
  return (
    <div className="font-poppins text-gray-800 bg-[#f8faf8] leading-relaxed">
      <header
        className="bg-[url('https://via.placeholder.com/1920x600?text=Green+Fields')] bg-cover bg-center text-white text-center pt-32 pb-16 relative"
        style={{ backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">
            Support That Grows With You
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Empowering farmers with smart solutions and dedicated assistance.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="flex flex-col lg:flex-row items-center gap-12 py-16">
          <div className="flex-1">
            <h2 className="text-4xl font-semibold text-[#2a7d2e] mb-6">
              About GrowSense
            </h2>
            <p className="text-gray-600 text-lg">
              GrowSense revolutionizes agriculture with cutting-edge technology.
              Our platform delivers real-time sensor data, AI-driven insights,
              and expert guidance to optimize irrigation, monitor crops, and
              maximize yields. We blend innovation with traditional farming
              values to empower farmers worldwide.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/agro+tech.jpg"
              alt="Image"
              width={200}
              height={200}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 bg-[#e8f5e9] text-center">
          <h2 className="text-4xl font-semibold text-[#2a7d2e] mb-6">
            How We Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <span className="text-5xl text-[#2a7d2e] mb-4 block mx-auto">
                🌱
              </span>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Environmental Monitoring
              </h3>
              <p className="text-gray-600">
                Track soil, weather, and moisture in real-time.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <span className="text-5xl text-[#2a7d2e] mb-4 block mx-auto">
                💧
              </span>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Irrigation Guidance
              </h3>
              <p className="text-gray-600">
                Smart recommendations for water efficiency.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <span className="text-5xl text-[#2a7d2e] mb-4 block mx-auto">
                📈
              </span>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                AI Insights
              </h3>
              <p className="text-gray-600">
                Data-driven decisions for better yields.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <span className="text-5xl text-[#2a7d2e] mb-4 block mx-auto">
                🖥️
              </span>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Web Dashboard
              </h3>
              <p className="text-gray-600">
                User-friendly interface for all farmers.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="flex flex-col lg:flex-row gap-12 py-16"
        >
          <div className="flex-1">
            <h2 className="text-4xl font-semibold text-[#2a7d2e] mb-6">
              Contact Us
            </h2>
            <p className="flex items-center text-lg mb-4">
              <span className="text-[#2a7d2e] mr-4 text-xl">📞</span> Phone:
              +977-98XXXXXXXX
            </p>
            <p className="flex items-center text-lg mb-4">
              <span className="text-[#2a7d2e] mr-4 text-xl">✉️</span> Email:
              support@growsense.com
            </p>
            <p className="flex items-center text-lg mb-4">
              <span className="text-[#2a7d2e] mr-4 text-xl">📍</span> Address:
              GrowSense Agriculture Tech Pvt. Ltd., Kathmandu, Nepal
            </p>
            <p className="flex items-center text-lg mb-4">
              <span className="text-[#2a7d2e] mr-4 text-xl">⏰</span> Hours:
              Mon-Fri, 9:00 AM – 5:00 PM
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-semibold text-[#2a7d2e] mb-6">
              Send a Message
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="p-3 border border-gray-300 rounded-md text-lg focus:border-[#2a7d2e] focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="p-3 border border-gray-300 rounded-md text-lg focus:border-[#2a7d2e] focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Your Message"
                required
                className="p-3 border border-gray-300 rounded-md text-lg focus:border-[#2a7d2e] focus:outline-none transition-colors resize-y min-h-[120px]"
              ></textarea>
              <button
                type="submit"
                className="inline-block px-8 py-3 bg-[#2a7d2e] text-white rounded-full font-semibold hover:bg-[#1b5e20] hover:-translate-y-1 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-4xl font-semibold text-[#2a7d2e] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="p-6 bg-[#f9f9f9] border-l-4 border-[#2a7d2e] rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Do I need technical knowledge to use GrowSense?
              </h3>
              <p className="text-gray-600">
                No! Our platform is designed to be intuitive and
                farmer-friendly.
              </p>
            </div>
            <div className="p-6 bg-[#f9f9f9] border-l-4 border-[#2a7d2e] rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Can I monitor multiple fields?
              </h3>
              <p className="text-gray-600">
                Yes, manage multiple locations with a single account.
              </p>
            </div>
            <div className="p-6 bg-[#f9f9f9] border-l-4 border-[#2a7d2e] rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                What sensors are supported?
              </h3>
              <p className="text-gray-600">
                Soil moisture, temperature, humidity, rainfall, and more.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
