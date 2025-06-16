"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const GuestGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
      router.replace("/dashboard");
    }
    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);
  return <>{!isAuthenticated && children}</>;
};

export default GuestGuard;
