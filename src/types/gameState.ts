import { LetterState } from "./letters";

export interface GameState {
  letters: LetterState[];
  currentQuestionIndex: number | null;
  currentAnswer: string;
  score: number;
  errors: number;
  isGameOver: boolean;
  isTimerRunning: boolean;
  timeLeft: number; // en segundos
}
