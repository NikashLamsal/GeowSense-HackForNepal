"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Control", href: "/control" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };
  return (
    <>
      <nav className="top-0 left-0 w-full bg-transparent backdrop-blur z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-[10vh]">
          <Link href="/">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src="/Logo.png" alt="Header logo" fill objectFit="cover" />
            </div>
          </Link>

          <ul className="flex items-center gap-6 text-lg font-roboto">
            {links.map((item, index) => (
              <div key={index}>
                {pathName === item.href ? (
                  <li>
                    <Link href={item.href}>
                      <p className="px-3 py-1 rounded hover:bg-white/20 transition-all duration-200 underline text-white font-semibold">
                        {item.label}
                      </p>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href={item.href}>
                      <p className="px-3 py-1 rounded hover:bg-white/20 transition-all duration-200 text-gray-300">
                        {item.label}
                      </p>
                    </Link>
                  </li>
                )}
              </div>
            ))}
            <li>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
