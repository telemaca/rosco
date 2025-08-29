import { useState, useEffect, useCallback, useMemo } from "react";
import { Definition } from "@/types/questions";
import { alphabet } from "@/types/alphabet";
import { LetterState, LetterStatus } from "@/types/letters";
import { GameState } from "@/types/gameState";
import { INITIAL_TIME } from "@/constants";

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
    timeLeft: INITIAL_TIME,
    loading: true,
  });

  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const [definitions, setDefinitions] = useState<Definition[]>([]);

  const fetchDefinitions = useCallback(
    async (forceRefresh = false): Promise<Definition[]> => {
      const cached = localStorage.getItem("definitionsCache");

      if (!forceRefresh && cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24h

        if (!isExpired) {
          setDefinitions(data);
          setGameState({ ...gameState, loading: false });
          return data;
        }
      }

      // Fetch nuevo
      const res = await fetch("/api/proxy");
      const data: Definition[] = await res.json();
      setDefinitions(data);
      setGameState({ ...gameState, loading: false });

      localStorage.setItem(
        "definitionsCache",
        JSON.stringify({ data, timestamp: Date.now() })
      );

      return data;
    },
    []
  );

  useEffect(() => {
    const loadDefinitions = async () => {
      await fetchDefinitions(false); // usa cache si está válido
    };
    loadDefinitions();
  }, [fetchDefinitions]);

  // Preparamos las preguntas al inicio para tenerlas asociadas a su letra
  const preparedQuestions = useMemo(() => {
    if (definitions.length === 25) {
      const questionMap = new Map<string, Definition>();
      definitions.forEach((q) => {
        questionMap.set(q.letter.toUpperCase(), q);
      });
      return questionMap;
    }
    return new Map<string, Definition>();
  }, [definitions]);

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

  // Detectar dispositivo solo en cliente
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setDeviceType("tablet");
    } else if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
        ua
      )
    ) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const startGame = useCallback(() => {
    const firstIndex = definitions.findIndex((q) => q.letter === "A");
    selectLetter("A");
    const freshLetters = initialLettersState.map((letter) => ({ ...letter }));

    setGameState((prev) => ({
      ...prev,
      letters: freshLetters,
      currentQuestionIndex: firstIndex !== -1 ? firstIndex : 0,
      isTimerRunning: true,
      isGameOver: false,
      timeLeft: INITIAL_TIME,
      score: 0,
      errors: 0,
    }));
  }, [initialLettersState]);

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

  const restartGame = useCallback(async () => {
    setGameState({ ...gameState, loading: true });
    const data = await fetchDefinitions(true); // fuerza nuevo fetch
    const firstIndex = data.findIndex((q) => q.letter === "A");

    selectLetter("A");
    const freshLetters = initialLettersState.map((letter) => ({ ...letter }));

    setGameState((prev) => ({
      ...prev,
      letters: freshLetters,
      currentQuestionIndex: firstIndex !== -1 ? firstIndex : 0,
      isTimerRunning: false,
      isGameOver: false,
      timeLeft: INITIAL_TIME,
      score: 0,
      errors: 0,
      loading: false,
    }));
  }, [fetchDefinitions, selectLetter]);

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
    const total = currentLetters.length;

    // Recorremos en bucle desde la siguiente letra
    for (let i = 1; i <= total; i++) {
      const idx = (currentIdx + i) % total;

      // Avanzar a cualquier letra que esté PENDING o PASSED
      if (
        currentLetters[idx].status === LetterStatus.PENDING ||
        currentLetters[idx].status === LetterStatus.PASSED
      ) {
        return idx;
      }
    }

    // Si no hay ni PENDING ni PASSED, significa que todas están respondidas → fin
    return null;
  };

  // Propiedades y funciones a exponer
  return {
    gameState,
    resumeGame,
    selectLetter,
    markAnswer,
    passQuestion,
    startGame,
    restartGame,
    deviceType,
    currentQuestion:
      gameState.currentQuestionIndex !== null
        ? definitions[gameState.currentQuestionIndex]
        : undefined,
  };
};
