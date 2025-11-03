export default function Title({ secondaryColor, style = {}, fontSize = "1em" }) {
  return (
    <div className="flex justify-center items-center m-0 p-0" style={style}>
      <div 
        className="w-full h-full rounded-[2vw] shadow-none transition-colors duration-700 flex justify-center items-center"
        style={{
          backgroundColor: secondaryColor
        }}
      >
        <h1
          className="font-light tracking-[0.12em] text-[#E6E6E6] m-0 p-0 text-center"
          style={{
            fontSize: fontSize,
            width: "100%",
          }}
        >
          switchsound
        </h1>
      </div>
    </div>
  );
}