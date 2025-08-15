import React from "react";
import LetterButton from "../LetterButton";
import { LetterState } from "@/types/letters";

interface RoscoBoardProps {
  letters: LetterState[];
  // onLetterClick: (letter: string) => void;
}

const RoscoBoard: React.FC<RoscoBoardProps> = ({ letters }) => {
  // Para un diseño circular, necesitaríamos calcular posiciones.
  // Aquí, un ejemplo más simple de grid, pero se puede adaptar.
  // Un diseño circular es más complejo y a menudo requiere SVG o posicionamiento absoluto con transformaciones.
  // Para empezar, un grid simple es funcional.

  // Si quieres un diseño circular más fiel, podrías:
  // 1. Usar SVG para dibujar el círculo y los segmentos.
  // 2. Usar posicionamiento absoluto con transform: rotate() y transform-origin.
  // Esto último es más fácil con CSS puro o Tailwind.

  // Ejemplo de grid 5x6 (aproximado para 27 letras)
  const rows = 5;
  const cols = 5;
  const letterElements = letters.map((letterState) => (
    <LetterButton
      key={letterState.letter}
      letter={letterState.letter}
      status={letterState.status}
    />
  ));

  // Para un diseño circular, necesitaríamos una lógica para posicionar estos botones.
  // Aquí, simplemente los mostramos en un grid para la funcionalidad básica.
  // En un Rosco real, las letras estarían dispuestas en un círculo.

  return (
    <div className="grid grid-cols-5 md:grid-cols-5 gap-4 justify-items-center items-center m-4">
      {letterElements}
    </div>
  );
};

export default RoscoBoard;
