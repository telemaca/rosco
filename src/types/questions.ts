export interface Question {
  letter: string;
  question: string;
  definition: string;
  position?: "contiene" | "empieza";
  // id: number;
  // category: string;
  // hint: string;
}

export type Definition = {
  id: string;
  letter: string;
  definition: string;
  answer: string;
};

// mock para maquetar
export const questionsData: Question[] = [
  {
    letter: "A",
    question: "Mamífero de gran tamaño, inteligente y con trompa.",
    definition: "elefante",
  },
  { letter: "B", question: "Capital de Francia.", definition: "paris" },
  {
    letter: "C",
    question: "Satélite natural de la Tierra.",
    definition: "LUNA",
  },
  {
    letter: "D",
    question: "Dícese de la cualidad de ser fiel.",
    definition: "LEALTAD",
  },
  {
    letter: "E",
    question: "Árbol frutal muy conocido, con manzanas.",
    definition: "MANZANO",
  },
  {
    letter: "F",
    question: "Instrumento musical de viento con teclado.",
    definition: "FLAUTA",
  },
  {
    letter: "G",
    question: "Continente donde se encuentra Egipto.",
    definition: "AFRICA",
  },
  { letter: "H", question: 'En inglés, "hola".', definition: "HELLO" },
  {
    letter: "I",
    question: "País donde se encuentra la Gran Muralla.",
    definition: "CHINA",
  },
  {
    letter: "J",
    question: "Mamífero marino conocido por su inteligencia.",
    definition: "DELFIN",
  },
  { letter: "L", question: "Fruto del olivo.", definition: "ACEITUNA" },
  { letter: "M", question: "Capital de Italia.", definition: "ROMA" },
  { letter: "N", question: "Satélite natural de Marte.", definition: "FOBOS" },
  {
    letter: "Ñ",
    question: "Ave domesticable, de carne blanca y pico curvado.",
    definition: "ÑANDU",
  },
  {
    letter: "O",
    question: "Planeta del sistema solar más cercano al Sol.",
    definition: "MERCURIO",
  },
  {
    letter: "P",
    question: "Continente más pequeño del mundo.",
    definition: "OCEANIA",
  },
  {
    letter: "Q",
    question: "Máquina que realiza tareas complejas de forma automática.",
    definition: "ROBOT",
  },
  {
    letter: "R",
    question: "Elemento químico con símbolo Re.",
    definition: "RENIO",
  },
  {
    letter: "S",
    question: "Actor que interpretó a Neo en Matrix.",
    definition: "KEANU",
  },
  { letter: "T", question: "La capital de España.", definition: "MADRID" },
  {
    letter: "U",
    question: "Continente ubicado en el hemisferio sur.",
    definition: "AUSTRALIA",
  },
  {
    letter: "V",
    question: "El idioma oficial de Brasil.",
    definition: "PORTUGUES",
  },
  {
    letter: "X",
    question: 'Nombre de pila del escritor de "Don Quijote de la Mancha".',
    definition: "MIGUEL",
  },
  {
    letter: "Y",
    question: 'Palabra que significa "y" en inglés.',
    definition: "AND",
  },
  {
    letter: "Z",
    question: "Reptil alargado y sin patas.",
    definition: "SERPIENTE",
  },
];
