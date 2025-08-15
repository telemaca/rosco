import { useRoscoGameContext } from "@/contexts/RoscoGameContext";
import styles from "./ManualControls.module.scss";

export const ManualControls = () => {
  const {
    gameState: { isTimerRunning },
    markAnswer,
    passQuestion,
    handleGameAction,
  } = useRoscoGameContext();

  return (
    <div className={`justify-center gap-4 mt-6 ${styles.manualControls}`}>
      <button
        onClick={() => markAnswer(true)}
        disabled={!isTimerRunning}
        className="flex px-4 py-3 bg-green-700 hover:bg-green-700 text-white rounded text-l"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
        Correcto
      </button>
      <div>
        <button
          onClick={() => markAnswer(false)}
          disabled={!isTimerRunning}
          className="flex px-4 py-3 bg-red-700 hover:bg-red-700 text-white rounded text-l"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          Incorrecto
        </button>
        <button
          onClick={() => handleGameAction(passQuestion, false)}
          disabled={!isTimerRunning}
          className="flex px-4 py-3 bg-yellow-600 hover:bg-yellow-600 text-white rounded text-l"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
          Pasapalabra
        </button>
      </div>
    </div>
  );
};
