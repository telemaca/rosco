import React from "react";

interface GameStatusProps {
  score: number;
  errors: number;
  totalQuestions: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
  score,
  errors,
  totalQuestions,
}) => {
  return (
    <div className="flex justify-end gap-4 items-center text-lg font-semibold">
      <div>
        <span className="text-green-600">{score}</span>
      </div>
      <div>
        <span className="text-red-600">{errors}</span>
      </div>
      <div>
        <span className="text-blue-400">
          {score + errors} / {totalQuestions}
        </span>
      </div>
    </div>
  );
};

export default GameStatus;
