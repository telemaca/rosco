import React from "react";
import { Question } from "../../types/questions";
import styles from "./QuestionDisplay.module.scss";

interface QuestionDisplayProps {
  question?: Question;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const capitalizeFirstLetter = (word: string | undefined) => {
    if (!word) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const capitalizedAnswer = capitalizeFirstLetter(question?.answer);

  return (
    <div className={styles.definitionContainer}>
      <p className="text-xl mb-2 text-gray-200">
        Empieza con{" "}
        <span className="font-semibold text-purple-400">
          {question?.letter}
        </span>
      </p>
      <div className={styles.defContainer}>
        <p className={styles.title}>DEFINICIÓN</p>
        <p className="text-l text-gray-100">{question?.question}</p>
      </div>
      <div className={styles.answerContainer}>
        <p className={styles.title}>RESPUESTA</p>
        <p className="text-xl font-bold">{capitalizedAnswer}</p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
