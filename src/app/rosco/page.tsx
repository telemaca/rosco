"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRoscoGame } from "@/hooks/useRoscoGame";
import RoscoBoard from "@/components/RoscoBoard";
import QuestionDisplay from "@/components/QuestionDisplay/QuestionDisplay";
import GameStatus from "@/components/GameStatus";
import { ManualControls } from "@/components/ManualControls/ManualControls";
import styles from "./page.module.scss";
import { useOrientation } from "@/hooks/useOrientation";
import { RotateDeviceOverlay } from "@/components/RotateDeviceOverlay";
import { CircularTimer } from "@/components/CircularTimer";

import { GameButton } from "@/components/GameButton/GameButton";

export default function Home() {
  const isPortrait = useOrientation();
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const {
    gameState,
    markAnswer,
    passQuestion,
    startGame,
    resumeGame,
    // pauseGame,
    // selectLetter,
    // handleAnswerChange,
    // setAnswer,
    currentQuestion,
  } = useRoscoGame();

  // Detectar dispositivo solo en cliente
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setDeviceType("tablet");
    } else if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
        ua
      )
    ) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const handleStartGame = () => {
    setShowQuestions(true);
    startGame();
  };

  const handleResumetGame = () => {
    setShowQuestions(true);
    resumeGame();
  };

  const handlePassQuestion = () => {
    setShowQuestions(false);
    passQuestion();
  };

  const renderGameButton = () => {
    if (!gameState.isTimerRunning && gameState.timeLeft === 120) {
      return (
        <GameButton label="EMPEZAR" onClick={handleStartGame} color="blue" />
      );
    }

    if (
      !gameState.isTimerRunning &&
      gameState.timeLeft < 120 &&
      gameState.timeLeft > 0
    ) {
      return (
        <GameButton
          label="REANUDAR"
          onClick={handleResumetGame}
          color="green"
        />
      );
    }

    if (gameState.timeLeft === 0) {
      return (
        <GameButton label="REINICIAR" onClick={handleStartGame} color="green" />
      );
    }

    return null;
  };

  return (
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

      {gameState.isGameOver ? (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-100">
            ¡Fin del juego!
          </h2>
          <p className="text-2xl mb-6 text-gray-300">
            Has completado el Rosco.
          </p>
          <p className="text-xl mb-2 text-gray-200">
            Total Aciertos:{" "}
            <span className="text-green-400">{gameState.score}</span>
          </p>
          <p className="text-xl mb-6 text-gray-200">
            Total Fallos:{" "}
            <span className="text-red-400">{gameState.errors}</span>
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-xl hover:bg-green-700 transition-colors"
          >
            Jugar de Nuevo
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          {showQuestions && (
            <div
              className={`${styles.questionCard} ${
                deviceType === "mobile" ? styles.mobile : ""
              }`}
            >
              <QuestionDisplay question={currentQuestion} />
              <div className={styles.rightColumn}>
                <GameStatus
                  score={gameState.score}
                  errors={gameState.errors}
                  totalQuestions={gameState.letters.length}
                />
                <CircularTimer
                  duration={120}
                  durationLeft={gameState.timeLeft}
                  size={150}
                  strokeWidth={15}
                />
                <ManualControls
                  isTimerStopped={!gameState.isTimerRunning}
                  onCorrect={() => markAnswer(true)}
                  onIncorrect={() => markAnswer(false)}
                  onPass={handlePassQuestion}
                />
              </div>
            </div>
          )}
          <div className={styles.mainStatusRosco}>
            <RoscoBoard letters={gameState.letters} />
            <div className="flex flex-col items-center mb-4 flex-1 justify-center">
              {renderGameButton()}
              <GameStatus
                score={gameState.score}
                errors={gameState.errors}
                totalQuestions={gameState.letters.length}
              />
              <p className="mt-3">
                Tiempo restante: <strong>{gameState.timeLeft}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
