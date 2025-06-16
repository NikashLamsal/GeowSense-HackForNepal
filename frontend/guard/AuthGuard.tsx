"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
  

    if (!accessToken ) {
      setIsAuthenticated(false);
      window.localStorage.clear();
      router.replace("/");
    }
  }, [router]);

  return <>{isAuthenticated && children}</>;
};

export default AuthGuard;
