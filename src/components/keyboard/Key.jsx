import React from "react";

export default function Key({ label, isPressed, className = "", style = {} }) {
  const pressedStyle = isPressed
    ? { background: "#646464ff", ...style }
    : { background: "#fff", ...style };

  return (
    <div
      className={`flex items-center justify-center select-none rounded-[10px] font-light text-[#2f3a58]
                  transition-all duration-100 tracking-widest lowercase
                  ${isPressed
                    ? "scale-[0.96] shadow-inner"
                    : "hover:bg-[#d8d8d8] shadow-[0_3px_8px_rgba(0,0,0,0.25)]"
                  }
                  ${className}`}
      style={pressedStyle}
    >
      {label}
    </div>
  );
}
