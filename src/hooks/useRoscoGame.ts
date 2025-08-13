import { useState, useEffect, useCallback, useMemo } from "react";
import { questionsData, Question } from "../types/questions";
import { alphabet } from "../types/alphabet";

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

export interface RoscoGameState {
  letters: LetterState[];
  currentQuestionIndex: number | null; // Índice de la pregunta activa
  isGameOver: boolean;
  score: number;
  errors: number;
  currentAnswer: string;
  // Puedes añadir: timer, rounds, etc.
}

interface GameState {
  letters: LetterState[];
  currentQuestionIndex: number | null;
  currentAnswer: string;
  score: number;
  errors: number;
  isGameOver: boolean;
  isTimerRunning: boolean;
  timeLeft: number; // en segundos
  hasStarted: boolean;
}

const initialLettersState: LetterState[] = alphabet.map((letter) => ({
  letter,
  status: LetterStatus.PENDING,
}));

export const useRoscoGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    letters: initialLettersState,
    currentQuestionIndex: 0,
    currentAnswer: "",
    score: 0,
    errors: 0,
    isGameOver: false,
    isTimerRunning: false,
    timeLeft: 120,
    hasStarted: false,
  });

  // Preparamos las preguntas al inicio para tenerlas asociadas a su letra
  const preparedQuestions = useMemo(() => {
    const questionMap = new Map<string, Question>();
    questionsData.forEach((q) => {
      questionMap.set(q.letter.toUpperCase(), q);
    });
    return questionMap;
  }, []);

  // Cronómetro
  useEffect(() => {
    if (!gameState.isTimerRunning || gameState.isGameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(interval);
          return {
            ...prev,
            timeLeft: 0,
            isGameOver: true,
            isTimerRunning: false,
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isTimerRunning, gameState.isGameOver]);

  // Función para iniciar o reiniciar el juego
  const startGame = useCallback(() => {
    const firstIndex = questionsData.findIndex((q) => q.letter === "A");
    selectLetter("A");

    setGameState((prev) => ({
      ...prev,
      letters: initialLettersState,
      currentQuestionIndex: firstIndex !== -1 ? firstIndex : 0,
      isTimerRunning: true,
      isGameOver: false,
      hasStarted: true,
      timeLeft: 120,
      score: 0,
      errors: 0,
    }));
  }, [initialLettersState]);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isTimerRunning: false,
    }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isTimerRunning: true,
    }));
  }, []);

  const passQuestion = useCallback(() => {
    if (gameState.isGameOver || gameState.currentQuestionIndex === null) return;

    const newLetters = [...gameState.letters];
    newLetters[gameState.currentQuestionIndex].status = LetterStatus.PASSED;

    const nextPendingIndex = findNextPendingLetterIndex(
      newLetters,
      gameState.currentQuestionIndex
    );

    if (nextPendingIndex !== null) {
      newLetters[nextPendingIndex].status = LetterStatus.SELECTED;
    }

    setGameState((prev) => ({
      ...prev,
      letters: newLetters,
      currentQuestionIndex: nextPendingIndex,
      isGameOver: nextPendingIndex === null,
      currentAnswer: "",
      isTimerRunning: false, // pausar al pasar
    }));
  }, [gameState]);

  // Seleccionar una letra para empezar
  const selectLetter = useCallback(
    (letter: string) => {
      if (gameState.isGameOver) return;

      const question = preparedQuestions.get(letter.toUpperCase());
      if (!question) return;

      const letterIndex = gameState.letters.findIndex(
        (l) => l.letter === letter.toUpperCase()
      );
      if (letterIndex === -1) return;

      // Marcar la letra seleccionada y preparar para responder
      const newLetters = [...gameState.letters];
      // Si ya había una seleccionada, la reseteamos a pendiente si no fue respondida
      const previouslySelectedIndex = newLetters.findIndex(
        (l) => l.status === LetterStatus.SELECTED
      );
      if (
        previouslySelectedIndex !== -1 &&
        previouslySelectedIndex !== letterIndex
      ) {
        newLetters[previouslySelectedIndex].status = LetterStatus.PENDING;
      }

      newLetters[letterIndex].status = LetterStatus.SELECTED;
      newLetters[letterIndex].question = question;

      setGameState((prev) => ({
        ...prev,
        letters: newLetters,
        currentQuestionIndex: letterIndex,
        currentAnswer: "", // Limpiar respuesta anterior
      }));
    },
    [gameState.letters, preparedQuestions, gameState.isGameOver]
  );

  const markAnswer = useCallback(
    (isCorrect: boolean) => {
      if (gameState.isGameOver || gameState.currentQuestionIndex === null)
        return;

      const newLetters = [...gameState.letters];
      const currentLetter = newLetters[gameState.currentQuestionIndex];

      currentLetter.status = isCorrect
        ? LetterStatus.CORRECT
        : LetterStatus.INCORRECT;

      const updatedScore = gameState.score + (isCorrect ? 1 : 0);
      const updatedErrors = gameState.errors + (!isCorrect ? 1 : 0);

      const nextPendingIndex = findNextPendingLetterIndex(
        newLetters,
        gameState.currentQuestionIndex
      );

      if (nextPendingIndex !== null) {
        newLetters[nextPendingIndex].status = LetterStatus.SELECTED;
      }

      setGameState((prev) => ({
        ...prev,
        letters: newLetters,
        score: updatedScore,
        errors: updatedErrors,
        currentQuestionIndex: nextPendingIndex,
        isGameOver: nextPendingIndex === null,
      }));
    },
    [gameState]
  );

  // Helper para encontrar la siguiente letra pendiente
  const findNextPendingLetterIndex = (
    currentLetters: LetterState[],
    currentIdx: number
  ): number | null => {
    // Paso 1: buscar siguiente pendiente
    for (let i = 1; i <= currentLetters.length; i++) {
      const idx = (currentIdx + i) % currentLetters.length;
      if (currentLetters[idx].status === LetterStatus.PENDING) {
        return idx;
      }
    }

    // Paso 2: si no hay más pendientes, buscar PASSED y reiniciarlas
    const hasPassed = currentLetters.some(
      (l) => l.status === LetterStatus.PASSED
    );
    if (hasPassed) {
      const resetLetters = currentLetters.map((l) =>
        l.status === LetterStatus.PASSED
          ? { ...l, status: LetterStatus.PENDING }
          : l
      );
      setGameState((prev) => ({
        ...prev,
        letters: resetLetters,
      }));

      const firstReset = resetLetters.findIndex(
        (l) => l.status === LetterStatus.PENDING
      );
      return firstReset !== -1 ? firstReset : null;
    }

    // Paso 3: no hay más pendientes ni pasadas → fin del juego
    return null;
  };

  const setAnswer = (answer: string) => {
    setGameState((prev) => ({
      ...prev,
      currentAnswer: answer,
    }));
  };

  // Propiedades y funciones a exponer
  return {
    gameState,
    setAnswer,
    pauseGame,
    resumeGame,
    selectLetter,
    markAnswer,
    passQuestion,
    startGame,
    currentQuestion:
      gameState.currentQuestionIndex !== null
        ? questionsData[gameState.currentQuestionIndex]
        : undefined,
  };
};
