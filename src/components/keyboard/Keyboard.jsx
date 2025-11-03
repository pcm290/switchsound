import React, { useState, useEffect } from "react";
import Key from "./Key";

export default function Keyboard({ className = "", style = {} }) {
  const [pressedKey, setPressedKey] = useState(null);

  const keyStyle = {
    width: "2vw",
    height: "2vw",
    fontSize: "1.2vw",
    fontWeight: "bold",
    color: "#353535ff",
    borderRadius: "10px",
    transition: "all 0.1s",
    textTransform: "lowercase",
    letterSpacing: "0.12em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const spaceStyle = {
    width: "13vw",
    height: "2vw",
    fontSize: "1.2vw",
    fontWeight: "bold",
    color: "#353535ff ",
    borderRadius: "10px",
    transition: "all 0.1s",
    textTransform: "lowercase",
    letterSpacing: "0.25em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const keyGap = "0.8vw";
  const rowGap = "0.8vw";

  useEffect(() => {
    const handleKeyDown = (e) => setPressedKey(e.key.toLowerCase());
    const handleKeyUp = () => setPressedKey(null);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div
      className={`flex flex-col items-center m-0 p-0 ${className}`}
      style={{ ...style, gap: rowGap }}
    >
      {keys.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", gap: keyGap }}>
          {row.map((key) => (
            <Key
              key={key}
              label={key}
              isPressed={pressedKey === key.toLowerCase()}
              style={keyStyle}
            />
          ))}
        </div>
      ))}
      <div style={{ marginTop: "0.2vw", display: "flex", justifyContent: "center" }}>
        <Key
          label="space"
          isPressed={pressedKey === " "}
          style={spaceStyle}
        />
      </div>
    </div>
  );
}
