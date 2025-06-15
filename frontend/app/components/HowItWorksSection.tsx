import Image from "next/image";
import Link from "next/link";

export default function HowItWorksSection() {
  return (
    <div className="py-16 text-center bg-white">
      <div className="container mx-auto">
        <h2 className="text-[2.5rem] text-[#2c3e50] font-bold mb-10">
          Get Started in 3 Easy Steps
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "/signup.gif",
              title: "Sign Up",
              desc: "Create a free account in minutes.",
            },
            {
              icon: "/setup.gif",
              title: "Set Up Your Farm",
              desc: "Input your crops, land details, and preferences.",
            },
            {
              icon: "/smart.gif",
              title: "Grow Smarter",
              desc: "Access tools, insights, and resources to succeed.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#f8f9fa] p-5 rounded-lg transition-transform hover:-translate-y-1"
            >
              <Image
                src={s.icon}
                alt={s.title + " Icon"}
                width={200}
                height={200}
                className="w-[60px] h-[60px] mb-4 mx-auto"
              />
              <h3 className="text-[#28a745] text-[1.5rem] mb-2">{s.title}</h3>
              <p className="text-[#555] text-[1rem] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/register"
          className="inline-block mt-8 px-6 py-3 bg-[#28a745] text-white text-[1.1rem] rounded hover:bg-[#218838] transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
