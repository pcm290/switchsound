export default function ModeSelector({
  mode,
  setMode,
  tertiaryColor,
  className = "",
  style = {}
}) {
  const handleClick = () => {
    console.log("ModeSelector clicked");
    setMode(mode === "free" ? "guided" : "free");
  };

  return (
    <div className={`flex justify-center items-center m-0 p-0 w-full h-full ${className}`} style={{ ...style, zIndex: 100 }}>
      <button
        onClick={handleClick}
        className="shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                   transition-all duration-700 focus:outline-none focus:ring-0 border-none outline-none
                   hover:shadow-[0_6px_15px_rgba(0,0,0,0.4)]
                   text-[clamp(0.5rem,0.7rem,1.5rem)] font-light tracking-[0.15em] text-[#E6E6E6]
                   rounded-[1.5vw] w-full h-full px-[2vw] py-[1vh]"
        style={{
          backgroundColor: tertiaryColor,
          border: 'none',
          fontFamily: 'Consolas, monospace',
          fontSize: '0.85rem',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        {mode === "free" ? "modo guiado" : "modo libre"}
      </button>
    </div>
  );
}
