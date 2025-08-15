import React from "react";
import { LetterStatus } from "@/types/letters";

interface LetterButtonProps {
  letter: string;
  status: LetterStatus;
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, status }) => {
  const getClassName = () => {
    switch (status) {
      case LetterStatus.CORRECT:
        return "bg-green-500 text-white";
      case LetterStatus.INCORRECT:
        return "bg-red-500 text-white";
      case LetterStatus.PASSED:
        return "bg-yellow-500 text-black";
      case LetterStatus.SELECTED:
        return "bg-blue-500 text-white ring-2 ring-white";
      case LetterStatus.PENDING:
      default:
        return "bg-gray-700 text-white hover:bg-gray-600";
    }
  };

  return (
    <button
      className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-colors duration-200 ${getClassName()}`}
      disabled={
        status !== LetterStatus.PENDING && status !== LetterStatus.SELECTED
      }
      aria-label={`Letra ${letter}`}
    >
      {letter}
    </button>
  );
};

export default LetterButton;
