import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

const GameStatus = () => {
  const {
    gameState: { score, errors, letters },
  } = useRoscoGameContext();

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
          {score + errors} / {letters.length}
        </span>
      </div>
    </div>
  );
};

export default GameStatus;
