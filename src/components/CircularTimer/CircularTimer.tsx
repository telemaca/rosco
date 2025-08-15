import { useEffect, useState } from "react";

type TimerProps = {
  duration: number; // duración en segundos
  durationLeft: number; // duración en segundos
  size?: number; // tamaño del círculo en px
  strokeWidth?: number;
};

export const CircularTimer = ({
  duration,
  durationLeft,
  size = 120,
  strokeWidth = 10,
}: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(durationLeft);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - secondsLeft / duration);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#9699a4ff"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#561e95ff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute text-3xl font-bold">{secondsLeft}</span>
    </div>
  );
};
