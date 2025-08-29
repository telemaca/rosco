import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

import styles from "./QuestionDisplay.module.scss";

export const QuestionDisplay = () => {
  const { currentQuestion } = useRoscoGameContext();
  const firstLetter = currentQuestion?.answer.charAt(0).toUpperCase();

  const capitalizeFirstLetter = () => {
    if (!currentQuestion?.answer) {
      return "";
    }
    return firstLetter + currentQuestion?.answer.slice(1);
  };

  const getLetterPositionText = () => {
    if (firstLetter === currentQuestion?.letter) {
      return "Empieza con ";
    }
    return "Contiene ";
  };

  return (
    <div className={styles.definitionContainer}>
      <p className="text-xl mb-2 text-gray-200">
        {getLetterPositionText()}
        <span className="font-semibold text-purple-400">
          {currentQuestion?.letter}
        </span>
      </p>
      <div className={styles.defContainer}>
        <p className={styles.title}>DEFINICIÓN</p>
        <p className="text-l text-gray-100">{currentQuestion?.definition}</p>
      </div>
      <div className={styles.answerContainer}>
        <p className={styles.title}>RESPUESTA</p>
        <p className="text-xl font-bold">{capitalizeFirstLetter()}</p>
      </div>
    </div>
  );
};
