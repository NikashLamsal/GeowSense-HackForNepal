import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white py-10 w-full">
      <div className="w-full px-4 mx-auto grid gap-6 md:grid-cols-3">
        <div>
          <div className="relative w-[200px] h-[50px] mb-4">
            <Image
              src="/Logo.png"
              alt="GrowSense Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="text-[#ccc] max-w-sm text-[1rem] leading-relaxed">
            GrowSense: Empowering farmers with tools to boost productivity and
            thrive.
          </p>
        </div>

        <div>
          <h3 className="text-[#28a745] text-[1.5rem] font-bold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-[#28a745] transition">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#28a745] text-[1.5rem] font-bold mb-4">
            Connect With Us
          </h3>
          <div className="flex gap-4 mb-4">
            {[
              { href: "https://x.com/growsense", src: "/x.svg", alt: "X Icon" },
              {
                href: "https://facebook.com/growsense",
                src: "/facebook.svg",
                alt: "Facebook Icon",
              },
              {
                href: "https://instagram.com/growsense",
                src: "/insta.svg",
                alt: "Instagram Icon",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener"
                aria-label={`Follow us on ${item.alt.split(" ")[0]}`}
              >
                <div className="relative w-[30px] h-[30px] hover:scale-110 transition-transform">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </a>
            ))}
          </div>
          <p className="italic text-[#ccc] text-[1rem]">
            Trusted by xyz..+ farmers worldwide
          </p>
        </div>
      </div>

      <div className="text-center mt-10 pt-5 border-t border-[#444] text-[#ccc] text-[0.9rem] px-4">
        <p>
          &copy; 2025 GrowSense. All rights reserved.
          <a href="/privacy" className="text-[#28a745] mx-2 hover:underline">
            Privacy Policy
          </a>
          |
          <a href="/terms" className="text-[#28a745] mx-2 hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
