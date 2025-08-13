export interface Question {
  letter: string;
  question: string;
  answer: string;
  position?: "contiene" | "empieza";
  // id: number;
  // category: string;
  // hint: string;
}

// mock para maquetar
export const questionsData: Question[] = [
  {
    letter: "A",
    question: "Mamífero de gran tamaño, inteligente y con trompa.",
    answer: "elefante",
  },
  { letter: "B", question: "Capital de Francia.", answer: "paris" },
  { letter: "C", question: "Satélite natural de la Tierra.", answer: "LUNA" },
  {
    letter: "D",
    question: "Dícese de la cualidad de ser fiel.",
    answer: "LEALTAD",
  },
  {
    letter: "E",
    question: "Árbol frutal muy conocido, con manzanas.",
    answer: "MANZANO",
  },
  {
    letter: "F",
    question: "Instrumento musical de viento con teclado.",
    answer: "FLAUTA",
  },
  {
    letter: "G",
    question: "Continente donde se encuentra Egipto.",
    answer: "AFRICA",
  },
  { letter: "H", question: 'En inglés, "hola".', answer: "HELLO" },
  {
    letter: "I",
    question: "País donde se encuentra la Gran Muralla.",
    answer: "CHINA",
  },
  {
    letter: "J",
    question: "Mamífero marino conocido por su inteligencia.",
    answer: "DELFIN",
  },
  { letter: "L", question: "Fruto del olivo.", answer: "ACEITUNA" },
  { letter: "M", question: "Capital de Italia.", answer: "ROMA" },
  { letter: "N", question: "Satélite natural de Marte.", answer: "FOBOS" },
  {
    letter: "Ñ",
    question: "Ave domesticable, de carne blanca y pico curvado.",
    answer: "ÑANDU",
  },
  {
    letter: "O",
    question: "Planeta del sistema solar más cercano al Sol.",
    answer: "MERCURIO",
  },
  {
    letter: "P",
    question: "Continente más pequeño del mundo.",
    answer: "OCEANIA",
  },
  {
    letter: "Q",
    question: "Máquina que realiza tareas complejas de forma automática.",
    answer: "ROBOT",
  },
  {
    letter: "R",
    question: "Elemento químico con símbolo Re.",
    answer: "RENIO",
  },
  {
    letter: "S",
    question: "Actor que interpretó a Neo en Matrix.",
    answer: "KEANU",
  },
  { letter: "T", question: "La capital de España.", answer: "MADRID" },
  {
    letter: "U",
    question: "Continente ubicado en el hemisferio sur.",
    answer: "AUSTRALIA",
  },
  {
    letter: "V",
    question: "El idioma oficial de Brasil.",
    answer: "PORTUGUES",
  },
  {
    letter: "X",
    question: 'Nombre de pila del escritor de "Don Quijote de la Mancha".',
    answer: "MIGUEL",
  },
  {
    letter: "Y",
    question: 'Palabra que significa "y" en inglés.',
    answer: "AND",
  },
  {
    letter: "Z",
    question: "Reptil alargado y sin patas.",
    answer: "SERPIENTE",
  },
];
