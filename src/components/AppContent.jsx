import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Title from "./layout/Title";
import ModeSelector from "./layout/ModeSelector";
import Keyboard from "./keyboard/Keyboard";
import SwitchSelector from "./switches/SwitchSelector";
import TextBox from "./layout/TextBox";
import MorphingElement from "./modals/MorphingElement";
import { useSwitches } from "../hooks/useSwitches";
import { useModalAnimation } from "../hooks/useModalAnimation";
import { darkenColor } from "../utils/colorUtils";

export default function AppContent() {
  const [mode, setMode] = useState("guided");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const {
    showBrandModal,
    showSpecModal,
    modalAnimationState,
    morphingElement,
    morphElementRect,
    isClosing,
    openSpecModal,
    openBrandModal,
    closeSpecModal,
    closeBrandModal,
  } = useModalAnimation();
  const { switches, selectedSwitch, brands, loading, error, selectSwitch, filterByBrand } = useSwitches();
  const { primaryColor, secondaryColor, tertiaryColor, updateTheme } = useTheme();

  useEffect(() => {
    const warmUpAudio = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext({ latencyHint: 'interactive' });
        const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        setTimeout(() => ctx.close(), 100);
      } catch (err) {
        console.warn('No se pudo precargar audio:', err);
      }
    };

    const handleFirstInteraction = () => {
      warmUpAudio();
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (selectedSwitch?.colorHex) {
      updateTheme(selectedSwitch.colorHex);
    }
  }, [selectedSwitch, updateTheme]);

  const handleBrandSelect = async (brand) => {
    await filterByBrand(brand);
    closeBrandModal();
  };

  useEffect(() => {
    if (modalAnimationState === "fadeOutKeyboard") {
      setShowKeyboard(false);
    }
    if (
      (modalAnimationState === "showing" && !showBrandModal && !showSpecModal) ||
      modalAnimationState === "idle"
    ) {
      setShowKeyboard(true);
    }
  }, [modalAnimationState, showBrandModal, showSpecModal]);

  return (
    <div
      className="h-screen w-screen relative overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: tertiaryColor,
      }}
    >
      <main className="relative w-full h-full" style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Title
          secondaryColor={secondaryColor}
          style={{
            position: "absolute",
            top: "4vh",
            left: "50vw",
            transform: "translateX(-50%)",
            width: "12vw",
            height: "6vh",
          }}
        />
        <TextBox
          mode={mode}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
          soundUrl={selectedSwitch?.sound_sample}
          style={{
            position: "absolute",
            top: "16vh",
            left: "50vw",
            transform: "translateX(-50%)",
            width: "75vw",
            height: "17.5vh",
          }}
        />
        <ModeSelector
          mode={mode}
          setMode={setMode}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
          style={{
            position: "absolute",
            top: "32vh",
            left: "50vw",
            transform: "translateX(-50%)",
            width: "11.7vw",
            height: "5vh",
          }}
        />
        <Keyboard
          style={{
            position: "absolute",
            top: "42vh",
            left: "50vw",
            transform: "translateX(-50%)",
            width: "30vw",
            height: "12vh",
            opacity: showKeyboard ? 1 : 0,
            transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: showKeyboard ? "auto" : "none"
          }}
        />
        <SwitchSelector
          switches={switches}
          selectedSwitch={selectedSwitch}
          brands={brands}
          loading={loading}
          error={error}
          selectSwitch={selectSwitch}
          filterByBrand={filterByBrand}
          tertiaryColor={tertiaryColor}
          onOpenBrandModal={openBrandModal}
          onOpenSpecModal={openSpecModal}
          modalAnimationState={modalAnimationState}
          morphingElement={morphingElement}
          style={{
            position: "absolute",
            bottom: "10vh",
            left: "50vw",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "16vh",
          }}
        />
        <MorphingElement
          morphingElement={morphingElement}
          morphElementRect={morphElementRect}
          modalAnimationState={modalAnimationState}
          isClosing={isClosing}
          selectedSwitch={selectedSwitch}
          primaryColor={primaryColor}
          tertiaryColor={tertiaryColor}
          brands={brands}
          onCloseSpec={closeSpecModal}
          onCloseBrand={closeBrandModal}
          onBrandSelect={handleBrandSelect}
        />
      </main>
    </div>
  );
}