import { ButtonConfig } from "@/types/gameButtonConfig";
import { GameButton } from "../GameButton/GameButton";
import { ManualControls } from "../ManualControls/ManualControls";
import { CircularTimer } from "../CircularTimer";
import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import GameStatus from "../GameStatus";
import RoscoBoard from "../RoscoBoard";

import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

import styles from "./InGameScreen.module.scss";

import { INITIAL_TIME } from "@/constants";

type InGameScreenProps = {
  showQuestions: boolean;
  onHandleGameAction: (callback: () => void, value: boolean) => void;
};

export const InGameScreen = ({
  showQuestions,
  onHandleGameAction,
}: InGameScreenProps) => {
  const {
    gameState,
    markAnswer,
    passQuestion,
    startGame,
    resumeGame,
    restartGame,
    currentQuestion,
    deviceType,
  } = useRoscoGameContext();

  const gameButtonConfig: ButtonConfig[] = [
    {
      condition:
        !gameState.isTimerRunning && gameState.timeLeft === INITIAL_TIME,
      label: "EMPEZAR",
      action: startGame,
      color: "blue",
      showQuestions: true,
    },
    {
      condition:
        !gameState.isTimerRunning &&
        gameState.timeLeft < INITIAL_TIME &&
        gameState.timeLeft > 0,
      label: "REANUDAR",
      action: resumeGame,
      color: "green",
      showQuestions: true,
    },
    {
      condition: gameState.timeLeft === 0,
      label: "NUEVO JUEGO",
      action: restartGame,
      color: "green",
      showQuestions: false,
    },
  ];

  const renderGameButton = () => {
    const btn = gameButtonConfig.find((b) => b.condition);
    return btn ? (
      <GameButton
        label={btn.label}
        onClick={() => onHandleGameAction(btn.action, btn.showQuestions)}
        color={btn.color}
      />
    ) : null;
  };

  return gameState.isGameOver ? null : (
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
              duration={INITIAL_TIME}
              durationLeft={gameState.timeLeft}
              size={150}
              strokeWidth={15}
            />
            <ManualControls
              isTimerStopped={!gameState.isTimerRunning}
              onCorrect={() => markAnswer(true)}
              onIncorrect={() => markAnswer(false)}
              onPass={() => onHandleGameAction(passQuestion, false)}
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
  );
};
