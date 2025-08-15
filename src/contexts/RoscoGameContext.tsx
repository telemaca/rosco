import { createContext, useContext, useState } from "react";
import { useRoscoGame } from "@/hooks/useRoscoGame";

type RoscoGameContextType = ReturnType<typeof useRoscoGame> & {
  showQuestions: boolean;
  handleGameAction: (action: () => void, show?: boolean) => void;
};

const RoscoGameContext = createContext<RoscoGameContextType | null>(null);

export const RoscoGameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  const handleGameAction = (action: () => void, show = true) => {
    setShowQuestions(show);
    action();
  };

  const roscoGame = useRoscoGame();
  return (
    <RoscoGameContext.Provider
      value={{ ...roscoGame, showQuestions, handleGameAction }}
    >
      {children}
    </RoscoGameContext.Provider>
  );
};

export const useRoscoGameContext = () => {
  const ctx = useContext(RoscoGameContext);
  if (!ctx)
    throw new Error(
      "useRoscoGameContext must be used within RoscoGameProvider"
    );
  return ctx;
};
