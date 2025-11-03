export default function SpecificationsModal({
  brand,
  model,
  type,
  actuation_force,
  travel_distance,
  primaryColor,
  darkerColor,
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
          className="text-white lowercase drop-shadow-lg"
          style={{
            fontSize: 'clamp(12px,2vw,14px)',
            fontWeight: '900',
            letterSpacing: '0.25em'
          }}
        >
          especificaciones
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col border-b" style={{ height: '33.333%', borderColor: darkerColor }}>
          <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: darkerColor }}>
            <span className="font-black lowercase tracking-wider text-[9px] text-white">marca</span>
          </div>
          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
            <span className="text-white font-bold text-base lowercase">{brand ? brand.toLowerCase() : 'n/a'}</span>
          </div>
        </div>

        <div className="w-full flex border-b" style={{ height: '33.333%', borderColor: darkerColor }}>
          <div className="flex-1 flex flex-col border-r" style={{ borderColor: darkerColor }}>
            <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: darkerColor }}>
              <span className="font-black lowercase tracking-wider text-[9px] text-white">modelo</span>
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              <span className="text-white font-semibold text-sm lowercase">{model ? model.toLowerCase() : 'n/a'}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: darkerColor }}>
              <span className="font-black lowercase tracking-wider text-[9px] text-white">tipo</span>
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              <span className="text-white font-semibold text-sm lowercase">{type ? type.toLowerCase() : 'n/a'}</span>
            </div>
          </div>
        </div>

        <div className="w-full flex" style={{ height: '33.333%' }}>
          <div className="flex-1 flex flex-col border-r" style={{ borderColor: darkerColor }}>
            <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: darkerColor }}>
              <span className="font-black lowercase tracking-wider text-[9px] text-white">fuerza</span>
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              <span className="text-white font-semibold text-sm lowercase">
                {actuation_force ? `${actuation_force.toString().toLowerCase()}g` : 'n/a'}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: darkerColor }}>
              <span className="font-black lowercase tracking-wider text-[9px] text-white">recorrido</span>
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              <span className="text-white font-semibold text-sm lowercase">
                {travel_distance ? `${travel_distance.toString().toLowerCase()}mm` : 'n/a'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full transition-all duration-300 
                 text-xs lowercase tracking-widest font-black
                 border-none outline-none focus:outline-none"
        style={{
          height: "clamp(36px,5vw,42px)",
          backgroundColor: darkerColor,
          color: '#ffffff',
          border: 'none'
        }}
      >
        cerrar
      </button>
    </div>
  );
}