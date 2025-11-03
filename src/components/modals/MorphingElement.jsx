export default function MorphingElement({
  morphingElement,
  morphElementRect,
  modalAnimationState,
  isClosing,
  selectedSwitch,
  primaryColor,
  tertiaryColor,
  brands,
  onCloseSpec,
  onCloseBrand,
  onBrandSelect,
}) {
  if (!morphingElement || !morphElementRect) return null;

  if (morphingElement === 'spec') {
    return (
      <div
        className="fixed rounded-[16px] flex flex-col z-50"
        style={{
          backgroundColor: 'transparent',
          left: (modalAnimationState === 'movingElement' && isClosing)
            ? `${morphElementRect.rect.left}px`
            : (modalAnimationState === 'fadeOutKeyboard')
              ? `${morphElementRect.rect.left}px`
              : (modalAnimationState === 'reverseMorphing')
                ? '50%'
                : '50%',
          top: (modalAnimationState === 'movingElement' && isClosing)
            ? `${morphElementRect.rect.top}px`
            : (modalAnimationState === 'fadeOutKeyboard')
              ? `${morphElementRect.rect.top}px`
              : (modalAnimationState === 'reverseMorphing')
                ? '55%'
                : '55%',
          width: (modalAnimationState === 'morphing' || modalAnimationState === 'showing')
            ? 'clamp(320px, 40vw, 400px)'
            : (modalAnimationState === 'reverseMorphing')
              ? `${morphElementRect.rect.width}px`
              : `${morphElementRect.rect.width}px`,
          height: (modalAnimationState === 'morphing' || modalAnimationState === 'showing')
            ? 'clamp(180px, 28vw, 210px)'
            : (modalAnimationState === 'reverseMorphing')
              ? `${morphElementRect.rect.height}px`
              : `${morphElementRect.rect.height}px`,
          transform: (modalAnimationState === 'movingElement' && isClosing)
            ? 'translate(0, 0)'
            : (modalAnimationState === 'fadeOutKeyboard')
              ? 'translate(0, 0)'
              : 'translate(-50%, -50%)',
          transitionProperty: 'all',
          transitionDuration: modalAnimationState === 'fadeOutKeyboard'
            ? '0ms'
            : (modalAnimationState === 'movingElement')
              ? '1200ms'
              : (modalAnimationState === 'reverseMorphing')
                ? '400ms'
                : '400ms',
          transitionTimingFunction: modalAnimationState === 'movingElement'
            ? 'cubic-bezier(0.16, 1, 0.3, 1)'
            : 'cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          opacity: 1,
          willChange: 'transform, left, top, width, height',
        }}
      >
        {(modalAnimationState === 'fadeOutKeyboard' || modalAnimationState === 'movingElement' || modalAnimationState === 'reverseMorphing') && (
          <>
            <div 
              className="w-full flex items-center justify-center rounded-t-[16px] flex-shrink-0"
              style={{ height: "clamp(36px,5vw,42px)", backgroundColor: morphElementRect.darkerColor }}
            >
              <span 
                className="text-white lowercase drop-shadow-md"
                style={{
                  fontSize: 'clamp(12px,2vw,14px)',
                  fontWeight: '900',
                  letterSpacing: '0.15em'
                }}
              >
                {morphElementRect.brand.toLowerCase()}
              </span>
            </div>

            <div 
              className="flex-1 flex items-center justify-center"
              style={{ backgroundColor: morphElementRect.color }}
            >
              {morphElementRect.image && (
                <img
                  src={morphElementRect.image}
                  alt={morphElementRect.brand.toLowerCase()}
                  className="object-contain drop-shadow-lg"
                  style={{
                    width: "clamp(78px,7vw,104px)",
                    height: "clamp(78px,7vw,104px)",
                  }}
                />
              )}
            </div>

            <div 
              className="w-full flex items-center justify-center rounded-b-[16px] flex-shrink-0"
              style={{ height: "clamp(36px,5vw,42px)", backgroundColor: morphElementRect.darkerColor }}
            >
              <span 
                className="text-white lowercase drop-shadow-md"
                style={{
                  fontSize: 'clamp(12px,2vw,14px)',
                  fontWeight: '700',
                  letterSpacing: '0.05em'
                }}
              >
                {morphElementRect.model.toLowerCase()}
              </span>
            </div>
          </>
        )}

        {(modalAnimationState === 'morphing' || modalAnimationState === 'showing') && (
          <>
            <div 
              className="w-full flex items-center justify-center flex-shrink-0"
              style={{ height: "clamp(36px,5vw,42px)", backgroundColor: morphElementRect.darkerColor }}
            >
              <span 
                className="text-white lowercase drop-shadow-lg"
                style={{
                  fontSize: 'clamp(12px,2vw,14px)',
                  fontWeight: '900',
                  letterSpacing: '0.25em'
                }}
              >
                Especificaciones
              </span>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="w-full flex flex-col border-b" style={{ height: '33.333%', borderColor: morphElementRect.darkerColor }}>
                <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: morphElementRect.darkerColor }}>
                  <span className="font-black lowercase tracking-wider text-[9px] text-white">Marca</span>
                </div>
                <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <span className="text-white font-bold text-base">{morphElementRect.brand.toLowerCase() || 'N/A'}</span>
                </div>
              </div>

              <div className="w-full flex border-b" style={{ height: '33.333%', borderColor: morphElementRect.darkerColor }}>
                <div className="flex-1 flex flex-col border-r" style={{ borderColor: morphElementRect.darkerColor }}>
                  <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: morphElementRect.darkerColor }}>
                    <span className="font-black lowercase tracking-wider text-[9px] text-white">Modelo</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-semibold text-sm">{morphElementRect.model.toLowerCase() || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: morphElementRect.darkerColor }}>
                    <span className="font-black lowercase tracking-wider text-[9px] text-white">Tipo</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-semibold text-sm lowercase">{selectedSwitch?.type || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex" style={{ height: '33.333%' }}>
                <div className="flex-1 flex flex-col border-r" style={{ borderColor: morphElementRect.darkerColor }}>
                  <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: morphElementRect.darkerColor }}>
                    <span className="font-black lowercase tracking-wider text-[9px] text-white">Fuerza</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-semibold text-sm">
                      {selectedSwitch?.actuation_force ? `${selectedSwitch.actuation_force}g` : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="w-full flex items-center justify-center" style={{ height: "clamp(18px,2vw,22px)", backgroundColor: morphElementRect.darkerColor }}>
                    <span className="font-black lowercase tracking-wider text-[9px] text-white">Recorrido</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-semibold text-sm">
                      {selectedSwitch?.travel_distance ? `${selectedSwitch.travel_distance}mm` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onCloseSpec}
              className="w-full transition-all duration-300 
                       text-xs lowercase tracking-widest font-black
                       border-none outline-none focus:outline-none"
              style={{
                height: "clamp(36px,5vw,42px)",
                backgroundColor: morphElementRect.darkerColor,
                color: '#ffffff',
                border: 'none'
              }}
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    );
  }

  if (morphingElement === 'brand') {
    return (
      <div
        className="fixed z-50"
        style={{
          position: 'fixed',
          backgroundColor: morphElementRect.darkerColor,
          left: (modalAnimationState === 'movingElement' && isClosing)
            ? `${morphElementRect.brandRect.left}px`
            : (modalAnimationState === 'fadeOutKeyboard')
              ? `${morphElementRect.brandRect.left}px`
              : `${morphElementRect.brandRect.left + (morphElementRect.brandRect.width / 2)}px`,
          top: (modalAnimationState === 'movingElement' && isClosing)
            ? `${morphElementRect.brandRect.top}px`
            : (modalAnimationState === 'fadeOutKeyboard')
              ? `${morphElementRect.brandRect.top}px`
              : '55%',
          width: (modalAnimationState === 'morphing' || modalAnimationState === 'showing')
            ? 'clamp(280px, 32vw, 360px)'
            : `${morphElementRect.brandRect.width}px`,
          height: (modalAnimationState === 'morphing' || modalAnimationState === 'showing')
            ? 'clamp(140px, 18vw, 200px)'
            : `${morphElementRect.brandRect.height}px`,
          transform: (modalAnimationState === 'movingElement' && isClosing)
            ? 'translate(0, 0)'
            : (modalAnimationState === 'fadeOutKeyboard')
              ? 'translate(0, 0)'
              : 'translate(-50%, -50%)',
          transitionProperty: 'all',
          transitionDuration: modalAnimationState === 'fadeOutKeyboard'
            ? '0ms'
            : (modalAnimationState === 'movingElement')
              ? '1400ms'
              : '400ms',
          transitionTimingFunction: modalAnimationState === 'movingElement'
            ? 'cubic-bezier(0.16, 1, 0.3, 1)'
            : 'cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          borderRadius: (modalAnimationState === 'morphing' || modalAnimationState === 'showing') 
            ? '12px' 
            : '16px 16px 0 0',
          display: 'flex',
          flexDirection: 'column',
          opacity: 1,
          willChange: 'transform, left, top, width, height',
        }}
      >
        <div 
          className="w-full flex items-center justify-center flex-shrink-0"
          style={{ 
            height: "clamp(36px,5vw,42px)",
            backgroundColor: morphElementRect.darkerColor,
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
            {(modalAnimationState === 'morphing' || modalAnimationState === 'showing')
              ? 'Marcas'
              : morphElementRect.brand.toLowerCase()
            }
          </span>
        </div>

        {(modalAnimationState === 'morphing' || modalAnimationState === 'showing') && (
          <div 
            className="flex-1 w-full flex gap-2 p-2"
            style={{ 
              minHeight: 0,
              overflow: 'hidden'
            }}
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
        )}

        {(modalAnimationState === 'morphing' || modalAnimationState === 'showing') && (
          <button
            onClick={onCloseBrand}
            className="w-full flex-shrink-0 transition-all duration-300 
                     text-xs lowercase tracking-wide font-bold rounded-b-[12px]
                     border-none outline-none focus:outline-none"
            style={{
              height: "clamp(36px,5vw,42px)",
              backgroundColor: morphElementRect.darkerColor,
              color: '#000000ff',
              border: 'none'
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    );
  }

  return null;
}