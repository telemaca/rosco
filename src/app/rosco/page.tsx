"use client";
import { useState } from "react";
import Head from "next/head";
import { useOrientation } from "@/hooks/useOrientation";
import { RotateDeviceOverlay } from "@/components/RotateDeviceOverlay";
import { GameOverScreen } from "@/components/GameOverScreen";
import { InGameScreen } from "@/components/InGameScreen/InGameScreen";

import { RoscoGameProvider } from "@/contexts/RoscoGameContext";

export default function Home() {
  const isPortrait = useOrientation();
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  const handleGameAction = (action: () => void, show = true) => {
    setShowQuestions(show);
    action();
  };

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
        <GameOverScreen onHandleGameAction={handleGameAction} />
        <InGameScreen
          showQuestions={showQuestions}
          onHandleGameAction={handleGameAction}
        />
      </div>
    </RoscoGameProvider>
  );
}
