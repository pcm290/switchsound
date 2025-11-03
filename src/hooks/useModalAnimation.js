import { useState } from 'react';

export function useModalAnimation() {
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [modalAnimationState, setModalAnimationState] = useState('idle');
  const [morphingElement, setMorphingElement] = useState(null);
  const [morphElementRect, setMorphElementRect] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const openSpecModal = (elementRect) => {
    setIsClosing(false);
    setMorphElementRect(elementRect);
    setMorphingElement('spec');
    setModalAnimationState('fadeOutKeyboard');
    
    setTimeout(() => {
      setModalAnimationState('movingElement');
      
      setTimeout(() => {
        setModalAnimationState('morphing');
        
        setTimeout(() => {
          setShowSpecModal(true);
          setModalAnimationState('showing');
        }, 400);
      }, 900);
    }, 300);
  };

  const openBrandModal = (elementRect) => {
    setIsClosing(false);
    setMorphElementRect(elementRect);
    setMorphingElement('brand');
    setModalAnimationState('fadeOutKeyboard');
    
    setTimeout(() => {
      setModalAnimationState('movingElement');
      
      setTimeout(() => {
        setModalAnimationState('morphing');
        
        setTimeout(() => {
          setShowBrandModal(true);
          setModalAnimationState('showing');
        }, 400);
      }, 1000);
    }, 300);
  };

  const closeSpecModal = () => {
    setIsClosing(true);
    setModalAnimationState('reverseMorphing');

    setTimeout(() => {
      setModalAnimationState('movingElement');

      setTimeout(() => {
        setShowSpecModal(false);
        setModalAnimationState('idle');
        setMorphingElement(null);
        setMorphElementRect(null);
        setIsClosing(false);
      }, 1200);
    }, 400);
  };

  const closeBrandModal = () => {
    setIsClosing(true);
    setModalAnimationState('reverseMorphing'); 

    setTimeout(() => {
      setModalAnimationState('movingElement'); 

      setTimeout(() => {
        setShowBrandModal(false); 
        setModalAnimationState('idle');
        setMorphingElement(null);
        setMorphElementRect(null);
        setIsClosing(false);
      }, 1400); 
    }, 400); 
  };

  const resetAnimation = () => {
    setShowBrandModal(false);
    setShowSpecModal(false);
    setModalAnimationState('idle');
    setMorphingElement(null);
    setMorphElementRect(null);
    setIsClosing(false);
  };

  return {
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
    resetAnimation,
  };
}