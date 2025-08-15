import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

import styles from "./QuestionDisplay.module.scss";

export const QuestionDisplay = () => {
  const { currentQuestion } = useRoscoGameContext();

  const capitalizeFirstLetter = (word: string | undefined) => {
    if (!word) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const capitalizedAnswer = capitalizeFirstLetter(currentQuestion?.answer);

  return (
    <div className={styles.definitionContainer}>
      <p className="text-xl mb-2 text-gray-200">
        Empieza con{" "}
        <span className="font-semibold text-purple-400">
          {currentQuestion?.letter}
        </span>
      </p>
      <div className={styles.defContainer}>
        <p className={styles.title}>DEFINICIÓN</p>
        <p className="text-l text-gray-100">{currentQuestion?.question}</p>
      </div>
      <div className={styles.answerContainer}>
        <p className={styles.title}>RESPUESTA</p>
        <p className="text-xl font-bold">{capitalizedAnswer}</p>
      </div>
    </div>
  );
};
