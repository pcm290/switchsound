import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import SwitchCard from "./SwitchCard";
import Title from "../layout/Title.jsx";

export default function SwitchSelector({ 
  switches, 
  selectedSwitch, 
  loading, 
  selectSwitch, 
  tertiaryColor,
  onOpenBrandModal,
  onOpenSpecModal,
  modalAnimationState,
  morphingElement,
  className = "",
  style = {}
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { secondaryColor } = useTheme(); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handlePrevious();
      else if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const prevSelectedRef = useRef(selectedIndex);
  useEffect(() => { prevSelectedRef.current = selectedIndex; }, [selectedIndex]);

  useEffect(() => {
    if (!selectedSwitch || !switches || switches.length === 0) return;
    const selId = typeof selectedSwitch === 'object' ? selectedSwitch.id : selectedSwitch;
    const foundIndex = switches.findIndex((s) => s.id === selId);
    if (foundIndex >= 0 && foundIndex !== selectedIndex) setSelectedIndex(foundIndex);
  }, [selectedSwitch, switches]);

  const handlePrevious = () => {
    if (switches.length === 0) return;
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : switches.length - 1;
    setSelectedIndex(newIndex);
    selectSwitch(switches[newIndex].id);
  };

  const handleNext = () => {
    if (switches.length === 0) return;
    const newIndex = selectedIndex < switches.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    selectSwitch(switches[newIndex].id);
  };

  const getVisibleSwitches = () => {
    if (switches.length === 0) return [];
    const visible = [];
    const totalSwitches = switches.length;
    for (let i = -2; i <= 2; i++) {
      const index = (selectedIndex + i + totalSwitches) % totalSwitches;
      visible.push({
        ...switches[index],
        actualIndex: index,
        position: i,
      });
    }
    return visible;
  };

  const selectedColor = switches[selectedIndex]?.colorHex || '#ff9999';

  const cardStyle = {
    width: "10vw",
    height: "12vw"
  };

  const carouselContainerRef = useRef(null);

  const [radius, setRadius] = useState(Math.max(window.innerWidth * 0.38, 200));

  useEffect(() => {
    const updateRadiusWindow = () => {
      setRadius(Math.max(window.innerWidth * 0.38, 200));
    };

    const updateRadiusContainer = () => {
      if (carouselContainerRef.current) {
        const width = carouselContainerRef.current.offsetWidth;
        if (width > 100) {
          setRadius(Math.max(width * 0.18, 200));
        }
      }
    };

    window.addEventListener("resize", updateRadiusWindow);

    let observer = null;
    if (carouselContainerRef.current && window.ResizeObserver) {
      observer = new ResizeObserver(() => {
        updateRadiusContainer();
      });
      observer.observe(carouselContainerRef.current);
    }

    updateRadiusWindow();
    setTimeout(updateRadiusContainer, 0);

    return () => {
      window.removeEventListener("resize", updateRadiusWindow);
      if (observer) observer.disconnect();
    };
  }, []);

  const [minLoading, setMinLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !minLoading) {
      setAnimateOut(true);
      setTimeout(() => setShowLoader(false), 800); 
    }
  }, [loading, minLoading]);

  if (loading || minLoading) return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: tertiaryColor,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div 
        style={{
          position: "relative",
          width: "24vw",
          height: "12vh",
        }}>
        <Title
          secondaryColor={secondaryColor}
          style={{
            width: "24vw",  
            height: "12vh",    
            position: "relative"
          }}
          fontSize="3em"
        />
      </div>
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {showLoader && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: tertiaryColor,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.8s',
          opacity: animateOut ? 0 : 1,
          pointerEvents: animateOut ? "none" : "auto" 
        }}>
          <div 
            style={{
              position: "relative",
              width: "24vw",
              height: "12vh",
            }}>
            <Title
              secondaryColor={secondaryColor}
              style={{
                width: "24vw",
                height: "12vh",
                position: "relative"
              }}
              fontSize="3em"
            />
          </div>
        </div>
      )}

      <div className={`flex flex-col items-center justify-center relative w-full h-full m-0 p-0 ${className}`} style={style}>
        <div className="flex items-center justify-center gap-2 w-full h-full" style={{ height: "100%" }}>
          <button
            onClick={handlePrevious}
            className="rounded-[12px] flex items-center justify-center shadow-lg hover:scale-105 border-none outline-none focus:outline-none"
            style={{ 
              backgroundColor: selectedColor,
              color: tertiaryColor,
              transition: 'transform 0.2s, color 0.7s',
              border: 'none',
              fontSize: '2rem',
              fontWeight: '900',
              width: "4vw",
              height: "12.8vh"
            }}
          >
            ◄
          </button>
          <div
            ref={carouselContainerRef}
            className="relative flex items-center justify-center w-full h-full"
            style={{
              maxWidth: "100%",
              minWidth: "0",
              height: "100%",
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d'
            }}
          >
            {getVisibleSwitches().map((switchItem) => {
              const isCenter = switchItem.position === 0;
              const angle = (switchItem.position * 18) * (Math.PI / 180);
              const translateX = Math.sin(angle) * radius;
              const translateZ = Math.cos(angle) * radius - radius;
              const scale = isCenter ? 1 : 0.75 - Math.abs(switchItem.position) * 0.08;
              const opacity = 1 - Math.abs(switchItem.position) * 0.15;
              const isAnimatingNow = isCenter && (
                modalAnimationState === 'fadeOutKeyboard' || 
                modalAnimationState === 'movingElement' || 
                modalAnimationState === 'morphing' ||
                modalAnimationState === 'showing' ||
                modalAnimationState === 'reverseMorphing'
              );
              const currentAnimationType = isAnimatingNow ? morphingElement : null;
              return (
                <div
                  key={switchItem.id}
                  className="absolute"
                  style={{
                    left: "50%",
                    transform: `translateX(-50%) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isCenter ? 20 : Math.round((1 - Math.abs(angle)) * 10),
                    transition: 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 350ms ease',
                    WebkitTransformStyle: 'preserve-3d',
                    transformStyle: 'preserve-3d',
                    ...cardStyle
                  }}
                >
                  <SwitchCard
                    brand={switchItem.brand}
                    color={switchItem.colorHex}
                    model={switchItem.model}
                    image={switchItem.image}
                    isSelected={isCenter}
                    onBrandClick={onOpenBrandModal}
                    onSpecClick={onOpenSpecModal}
                    isAnimating={isAnimatingNow}
                    animationType={currentAnimationType}
                    style={cardStyle}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="rounded-[12px] flex items-center justify-center shadow-lg hover:scale-105 border-none outline-none focus:outline-none"
            style={{ 
              backgroundColor: selectedColor,
              color: tertiaryColor,
              transition: 'transform 0.2s, color 0.7s',
              border: 'none',
              fontSize: '2rem',
              fontWeight: '900',
              width: "4vw",
              height: "12.8vh"
            }}
          >
            ►
          </button>
        </div>
      </div>
    </div>
  );
}
