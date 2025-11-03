import { useRef } from "react";
import { darkenColor } from "../../utils/colorUtils";

export default function SwitchCard({ 
  brand, 
  color, 
  model, 
  colorName,
  image, 
  isSelected, 
  onBrandClick,
  onSpecClick,
  isAnimating,
  animationType,
  className = "",
  style = {}
}) {
  const cardRef = useRef(null);
  const brandRef = useRef(null);

  const darkerColor = darkenColor(color, 30);

  const handleBrandClick = (e) => {
    e.stopPropagation();
    if (isSelected && onBrandClick && brandRef.current && cardRef.current) {
      const brandRect = brandRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      onBrandClick({
        brand,
        model,
        image,
        color,
        darkerColor,
        brandRect: {
          left: brandRect.left,
          top: brandRect.top,
          width: brandRect.width,
          height: brandRect.height,
        },
        cardRect: {
          left: cardRect.left,
          top: cardRect.top,
          width: cardRect.width,
          height: cardRect.height,
        }
      });
    }
  };

  const handleCardClick = () => {
    if (isSelected && onSpecClick && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onSpecClick({
        brand,
        model,
        image,
        color,
        darkerColor,
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        }
      });
    }
  };

  const shouldHideCard = isAnimating && animationType === 'spec';
  const shouldHideBrand = isAnimating && animationType === 'brand';

  if (shouldHideCard) {
    return (
      <div
        ref={cardRef}
        className={`
          relative overflow-visible
          rounded-[16px]
          ${className}
        `}
        style={{
          visibility: 'hidden',
          ...style
        }}
      />
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`
        relative overflow-visible
        rounded-[16px]
        transition-all duration-300
        ${isSelected 
          ? "shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]" 
          : "opacity-70 hover:opacity-90 shadow-[0_5px_20px_rgba(0,0,0,0.2)]"
        }
        ${className}
      `}
      style={{
        opacity: shouldHideBrand ? 0.2 : 1,
        ...style
      }}
    >
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div 
          ref={brandRef}
          onClick={handleBrandClick}
          className={`
            w-full flex items-center justify-center transition-all duration-200 rounded-t-[16px]
            ${isSelected ? "cursor-pointer hover:brightness-110" : "cursor-default"}
          `}
          style={{ 
            backgroundColor: darkerColor,
            visibility: shouldHideBrand ? 'hidden' : 'visible',
            minHeight: "20%", 
          }}
        >
          <div
            style={{ fontWeight: '750' }}
            className={`text-white font-black lowercase tracking-widest transition-all duration-200 drop-shadow-md pointer-events-none ${isSelected ? "text-[14px]" : "text-[13px]"}`}
          >
            {brand}
          </div>
        </div>
        <div 
          className="flex items-center justify-center w-full"
          style={{ backgroundColor: color, minHeight: "60%" }} 
        >
          <div className="flex items-center justify-center pointer-events-none h-full w-full">
            {image ? (
              <img
                src={image}
                alt={`${brand} ${colorName}`}
                className={`object-contain drop-shadow-lg transition-all duration-300 w-full h-full`}
                style={{
                  width: "80%",
                  height: "80%",
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className={`w-full h-full bg-white/30 rounded-lg flex items-center justify-center text-white/50 font-bold ${isSelected ? "text-2xl" : "text-xl"}`}>
                ?
              </div>
            )}
          </div>
        </div>
        <div 
          className={`w-full flex items-center justify-center rounded-b-[16px] pointer-events-none`}
          style={{ backgroundColor: darkerColor, minHeight: "20%" }} 
        >
          <div
            style={{ fontWeight: '600' }}
            className={`text-white font-black lowercase tracking-wide transition-all duration-200 drop-shadow-md ${isSelected ? "text-[14px]" : "text-[12px]"}`}
          >
            {model}
          </div>
        </div>
      </div>
    </div>
  );
}