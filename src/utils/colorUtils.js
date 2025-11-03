export const getLuminance = (hex) => {
  if (!hex) return 0;
  
  hex = hex.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  return luminance;
};

export const getOptimalTextColor = (backgroundColor) => {
  const luminance = getLuminance(backgroundColor);
  
  if (luminance > 0.5) {
    return '#1f2937';
  } else {
    return '#e5e7eb';
  }
};

export function darkenColor(hex, percent = 30, fallback = "#222") {
  if (!hex || typeof hex !== 'string') return fallback;
  hex = hex.replace('#', '');
  if (hex.length !== 6) return fallback;
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}