"use client";
import Head from "next/head";
import { useOrientation } from "@/hooks/useOrientation";
import { RoscoGameProvider } from "@/contexts/RoscoGameContext";

import { RotateDeviceOverlay } from "@/components/RotateDeviceOverlay";
import { GameOverScreen } from "@/components/GameOverScreen/GameOverScreen";
import { InGameScreen } from "@/components/InGameScreen/InGameScreen";

export default function Home() {
  const isPortrait = useOrientation();

  return (
    <RoscoGameProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <Head>
          <title>Mi Rosco | Pasapalabras</title>
          <meta
            name="description"
            content="Juega al Rosco como en Pasapalabras"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <RotateDeviceOverlay visible={isPortrait} />
        <InGameScreen />
        <GameOverScreen />
      </div>
    </RoscoGameProvider>
  );
}
