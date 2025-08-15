import { createContext, useContext } from "react";
import { useRoscoGame } from "@/hooks/useRoscoGame";

const RoscoGameContext = createContext<ReturnType<typeof useRoscoGame> | null>(
  null
);

export const RoscoGameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const roscoGame = useRoscoGame();
  return (
    <RoscoGameContext.Provider value={roscoGame}>
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
