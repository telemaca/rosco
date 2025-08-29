"use client";
import { useEffect } from "react";
import Head from "next/head";
import { RotateDeviceOverlay } from "@/components/RotateDeviceOverlay";
import { useOrientation } from "@/hooks/useOrientation";
import RoscoLanding from "@/components/RoscoLanding/RoscoLanding";

export default function Home() {
  const isPortrait = useOrientation();

  useEffect(() => {
    fetch("https://rosco-api.onrender.com/health").catch(() => {
      console.log("API warming up...");
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Head>
        <title>Mi Rosco | Pasapalabras</title>
        <meta
          name="description"
          content="Juega al Rosco como en Pasapalabras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RotateDeviceOverlay visible={isPortrait} />
      <RoscoLanding />
    </div>
  );
}
