import { ButtonConfig } from "@/types/gameButtonConfig";
import { GameButton } from "../GameButton/GameButton";
import GameStatus from "../GameStatus/GameStatus";
import RoscoBoard from "../RoscoBoard/RoscoBoard";
import { DefinitionsModal } from "../DefinitionsModal/DefinitionsModal";
import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

import styles from "./InGameScreen.module.scss";

import { INITIAL_TIME } from "@/constants";

export const InGameScreen = () => {
  const {
    gameState: { isTimerRunning, timeLeft, isGameOver, letters },
    startGame,
    resumeGame,
    restartGame,
    handleGameAction,
    showQuestions,
  } = useRoscoGameContext();

  const gameButtonConfig: ButtonConfig[] = [
    {
      condition: !isTimerRunning && timeLeft === INITIAL_TIME,
      label: "EMPEZAR",
      action: startGame,
      color: "blue",
      showQuestions: true,
    },
    {
      condition: !isTimerRunning && timeLeft < INITIAL_TIME && timeLeft > 0,
      label: "REANUDAR",
      action: resumeGame,
      color: "green",
      showQuestions: true,
    },
    {
      condition: timeLeft === 0,
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
        onClick={() => handleGameAction(btn.action, btn.showQuestions)}
        color={btn.color}
      />
    ) : null;
  };

  return isGameOver ? null : (
    <div className="w-full max-w-3xl">
      {showQuestions && <DefinitionsModal />}
      <div className={styles.mainStatusRosco}>
        <RoscoBoard letters={letters} />
        <div className="flex flex-col items-center mb-4 flex-1 justify-center">
          {renderGameButton()}
          <GameStatus />
          <p className="mt-3">
            Tiempo restante: <strong>{timeLeft}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
