import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full z-[-1] object-cover">
        <Image
          src="/herof.svg"
          alt="Lush farmland with thriving crops"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
