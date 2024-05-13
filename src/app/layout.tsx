"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@/Loader"
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        
          {loading ? <Loader /> : children}
      
      </body>
    </html>
  );
}
