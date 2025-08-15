import { Question } from "./questions";

export enum LetterStatus {
  PENDING = "pending",
  CORRECT = "correct",
  INCORRECT = "incorrect",
  PASSED = "passed",
  SELECTED = "selected",
}

export interface LetterState {
  letter: string;
  status: LetterStatus;
  question?: Question;
}
