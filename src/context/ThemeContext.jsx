import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

const darkenColor = (hex, percent = 30) => {
  if (!hex || typeof hex !== 'string') {
    return '#FFB3C6';
  }
  
  hex = hex.replace('#', '');
  
  if (hex.length !== 6) {
    return '#FFB3C6';
  }
  
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#FFB3C6');
  const [secondaryColor, setSecondaryColor] = useState('#B27D8A');
  const [tertiaryColor, setTertiaryColor] = useState('#593E45'); 

  const updateTheme = (color) => {
    if (color) {
      const darker = darkenColor(color, 30);
      const extraDark = darkenColor(color, 65); 
      setPrimaryColor(color);
      setSecondaryColor(darker);
      setTertiaryColor(extraDark); 
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      primaryColor, 
      secondaryColor,
      tertiaryColor, 
      updateTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};