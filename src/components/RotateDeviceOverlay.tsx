// components/RotateDeviceOverlay.tsx
import React from "react";

type Props = { visible: boolean };

export const RotateDeviceOverlay: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        textAlign: "center",
        padding: "20px",
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "20px" }}
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 3h5v5" />
        <path d="M21 3l-6 6" />
      </svg>
      <h2>Girá tu dispositivo</h2>
      <p>Este juego funciona mejor en orientación horizontal.</p>
    </div>
  );
};
