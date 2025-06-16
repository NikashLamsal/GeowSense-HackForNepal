import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Navbar() {
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
            <li>
              <Link href="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
