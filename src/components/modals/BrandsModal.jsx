export default function BrandsModal({
  brands,
  tertiaryColor,
  darkerColor,
  onBrandSelect,
  onClose,
  className = ""
}) {
  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      <div 
        className="w-full flex items-center justify-center flex-shrink-0"
        style={{
          height: "clamp(36px,5vw,42px)",
          backgroundColor: darkerColor
        }}
      >
        <span 
          className="text-white lowercase drop-shadow-md"
          style={{
            fontSize: 'clamp(12px,2vw,14px)',
            fontWeight: '900',
            letterSpacing: '0.15em',
          }}
        >
          Marcas
        </span>
      </div>

      <div 
        className="flex-1 w-full flex gap-2 p-2"
        style={{ minHeight: 0, overflow: 'hidden' }}
      >
        <div className="flex-1 flex flex-col gap-2">
          {brands.filter((_, index) => index % 2 === 0).map((brand, arr) => (
            <button
              key={brand}
              onClick={() => onBrandSelect(brand)}
              className="flex items-center justify-center transition-all duration-200
                         text-xs lowercase tracking-wide font-bold text-center
                         border-none outline-none focus:outline-none rounded-md"
              style={{
                flex: `1 1 ${100 / arr.length}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: tertiaryColor,
                border: 'none',
                minHeight: 0,
              }}
            >
              {brand}
            </button>
          ))}
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          {brands.filter((_, index) => index % 2 === 1).map((brand, arr) => (
            <button
              key={brand}
              onClick={() => onBrandSelect(brand)}
              className="flex items-center justify-center transition-all duration-200
                         text-xs lowercase tracking-wide font-bold text-center
                         border-none outline-none focus:outline-none rounded-md"
              style={{
                flex: `1 1 ${100 / arr.length}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: tertiaryColor,
                border: 'none',
                minHeight: 0,
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full flex-shrink-0 transition-all duration-300 
                 text-xs lowercase tracking-wide font-bold rounded-b-[12px]
                 border-none outline-none focus:outline-none"
        style={{
          height: "clamp(36px,5vw,42px)",
          backgroundColor: darkerColor,
          color: '#000000ff',
          border: 'none'
        }}
      >
        Cancelar
      </button>
    </div>
  );
}