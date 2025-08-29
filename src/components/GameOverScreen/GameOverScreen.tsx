import { GameButton } from "../GameButton/GameButton";
import { useRoscoGameContext } from "@/contexts/RoscoGameContext";

export const GameOverScreen = () => {
  const {
    gameState: { score, isGameOver, errors, loading },
    restartGame,
    handleGameAction,
  } = useRoscoGameContext();
  const answered = score + errors;
  const hasPassedAnswers = answered < 25;

  return isGameOver && !loading ? (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-100">¡Fin del juego!</h2>
      <p className="text-2xl mb-6 text-gray-300">
        {hasPassedAnswers
          ? "Te quedaste sin tiempo."
          : "Has completado el Rosco."}
      </p>
      <p className="text-xl mb-2 text-gray-200">
        Total Aciertos: <span className="text-green-400">{score}</span>
      </p>
      <p className="text-xl mb-2 text-gray-200">
        Total Fallos: <span className="text-red-400">{errors}</span>
      </p>
      {hasPassedAnswers && (
        <p className="text-xl mb-6 text-gray-200">
          Sin responder:{" "}
          <span className="text-orange-400">{25 - answered}</span>
        </p>
      )}
      <GameButton
        label="REINICIAR"
        onClick={() => handleGameAction(restartGame, false)}
        color="green"
      />
    </div>
  ) : null;
};
