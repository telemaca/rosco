export type ButtonConfig = {
  condition: boolean;
  label: string;
  action: () => void;
  color: "blue" | "green";
  showQuestions: boolean;
};
