import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

import { ManualControls } from "../ManualControls/ManualControls";
import { CircularTimer } from "../CircularTimer/CircularTimer";
import { QuestionDisplay } from "../QuestionDisplay/QuestionDisplay";
import GameStatus from "../GameStatus/GameStatus";

import styles from "./DefinitionsModal.module.scss";

import { INITIAL_TIME } from "@/constants";

export const DefinitionsModal = () => {
  const {
    gameState: { timeLeft },
    deviceType,
  } = useRoscoGameContext();

  const getClassName = () => {
    if (deviceType === "mobile") {
      return `${styles.questionCard} ${styles.mobile}`;
    }
    return styles.questionCard;
  };

  return (
    <div className={getClassName()}>
      <QuestionDisplay />
      <div className={styles.rightColumn}>
        <GameStatus />
        <CircularTimer
          duration={INITIAL_TIME}
          durationLeft={timeLeft}
          size={150}
          strokeWidth={15}
        />
        <ManualControls />
      </div>
    </div>
  );
};
