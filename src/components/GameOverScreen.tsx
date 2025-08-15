import { GameButton } from "./GameButton/GameButton";
import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

type GameOverScreenProps = {
  onHandleGameAction: (callback: () => void, value: boolean) => void;
};

export const GameOverScreen = ({ onHandleGameAction }: GameOverScreenProps) => {
  const { gameState, restartGame } = useRoscoGameContext();
  return gameState.isGameOver ? (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-100">¡Fin del juego!</h2>
      <p className="text-2xl mb-6 text-gray-300">
        {gameState.score + gameState.errors < 25
          ? "Te quedaste sin tiempo."
          : "Has completado el Rosco."}
      </p>
      <p className="text-xl mb-2 text-gray-200">
        Total Aciertos:{" "}
        <span className="text-green-400">{gameState.score}</span>
      </p>
      <p className="text-xl mb-2 text-gray-200">
        Total Fallos: <span className="text-red-400">{gameState.errors}</span>
      </p>
      {gameState.score + gameState.errors < 25 && (
        <p className="text-xl mb-6 text-gray-200">
          Sin responder:{" "}
          <span className="text-orange-400">
            {25 - (gameState.score + gameState.errors)}
          </span>
        </p>
      )}
      <GameButton
        label="REINICIAR"
        onClick={() => onHandleGameAction(restartGame, false)}
        color="green"
      />
    </div>
  ) : null;
};
