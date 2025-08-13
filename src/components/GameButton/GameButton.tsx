import styles from "./GameButton.module.scss";

type GameButtonProps = {
  label: string;
  onClick: () => void;
  color: "blue" | "green";
};

export const GameButton: React.FC<GameButtonProps> = ({
  label,
  onClick,
  color,
}) => {
  const colorClass = color === "blue" ? styles.bgBlue : styles.bgGreen;

  return (
    <button onClick={onClick} className={`${styles.gameButton} ${colorClass}`}>
      {label}
    </button>
  );
};
