import React, { useState, useEffect, useRef } from "react";
import { spanishWords } from "../../data/spanishWords";
import { getOptimalTextColor } from "../../utils/colorUtils";
import { useSwitchSound } from "../../hooks/useSwitchSound";

function justifyLine(words, charsPerLine) {
  if (words.length === 1) return words[0].padEnd(charsPerLine, " ");
  let totalChars = words.join("").length;
  let totalSpaces = charsPerLine - totalChars;
  let gaps = words.length - 1;
  let minSpace = Math.floor(totalSpaces / gaps);
  let extra = totalSpaces % gaps;
  let line = "";
  for (let i = 0; i < words.length; i++) {
    line += words[i];
    if (i < gaps) {
      line += " ".repeat(minSpace + (i < extra ? 1 : 0));
    }
  }
  return line;
}

function getJustifiedTextLines(wordsArray, lineCount = 3, charsPerLine = 95) {
  const lines = [];
  let wordIndex = 0;
  for (let i = 0; i < lineCount; i++) {
    let words = [];
    let lineLen = 0;
    while (wordIndex < wordsArray.length) {
      const word = wordsArray[wordIndex % wordsArray.length];
      if (lineLen + word.length + (words.length > 0 ? 1 : 0) > charsPerLine) break;
      words.push(word);
      lineLen += word.length + (words.length > 1 ? 1 : 0);
      wordIndex++;
    }
    const justified = justifyLine(words, charsPerLine);
    lines.push(justified);
  }
  return lines.join("\n");
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeText(text) {
  return text.replace(/ +/g, " ");
}

export default function TextBox({ 
  mode = "free", 
  primaryColor, 
  secondaryColor, 
  soundUrl,
  fontSize = "1.1rem",
  style = {}
}) {
  const [guidedText, setGuidedText] = useState("");
  const [freeText, setFreeText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [charsPerLine, setCharsPerLine] = useState(99);
  const [guidedTextOffset, setGuidedTextOffset] = useState(0);
  const [guidedTextOffsetTop, setGuidedTextOffsetTop] = useState(0);
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const pressedKeysRef = useRef(new Set());
  const firstCharRef = useRef(null);
  const textareaRef = useRef(null);
  const [verticalAlignOffset, setVerticalAlignOffset] = useState(0);
  
  const { playPressSound, playReleaseSound } = useSwitchSound(soundUrl);

  const textColor = getOptimalTextColor(secondaryColor);

  useEffect(() => {
    function calculateCharsPerLine() {
      if (!boxRef.current) return;
      const boxWidth = boxRef.current.offsetWidth; 
      const fontPx = parseFloat(getComputedStyle(boxRef.current).fontSize); 
      const charWidth = fontPx * 0.6;
      const usableWidth = boxWidth * 0.95; 
      const chars = Math.floor(usableWidth / charWidth);
      setCharsPerLine(chars);
    }

    calculateCharsPerLine();
    window.addEventListener("resize", calculateCharsPerLine);
    return () => window.removeEventListener("resize", calculateCharsPerLine);
  }, [fontSize]);

  useEffect(() => {
    if (mode === "guided") {
      const shuffledWords = shuffleArray(spanishWords);
      const randomText = getJustifiedTextLines(shuffledWords, 3, charsPerLine); 
      setGuidedText(randomText);
      setUserInput("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setUserInput("");
      setFreeText("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [mode, charsPerLine]); 

  useEffect(() => {
    if (mode === "guided" && firstCharRef.current && boxRef.current) {
      const boxRect = boxRef.current.getBoundingClientRect();
      const charRect = firstCharRef.current.getBoundingClientRect();
      setGuidedTextOffset(charRect.left - boxRect.left);
      setGuidedTextOffsetTop(charRect.top - boxRect.top);
    }
  }, [guidedText, mode, fontSize]);

  useEffect(() => {
    if (
      mode === "guided" &&
      firstCharRef.current &&
      boxRef.current &&
      textareaRef.current
    ) {
      const charRect = firstCharRef.current.getBoundingClientRect();
      const textareaRect = textareaRef.current.getBoundingClientRect();
      const placeholderTop = textareaRect.top + parseFloat(getComputedStyle(textareaRef.current).paddingTop || 0);
      const guidedTextTop = charRect.top;

      setVerticalAlignOffset(placeholderTop - guidedTextTop);
    }
  }, [guidedText, mode, fontSize, guidedTextOffsetTop]);

  const handleKeyDown = (e) => {
    if (pressedKeysRef.current.has(e.key)) return;
    pressedKeysRef.current.add(e.key);
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === ' ') playPressSound();
  };

  const handleFreeTextChange = (e) => {
    setFreeText(e.target.value);
  };

  const handleKeyUp = (e) => {
    pressedKeysRef.current.delete(e.key);
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === ' ') playReleaseSound();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= normalizeText(guidedText).length) setUserInput(value);
  };

  const handleContainerClick = () => {
    e.stopPropagation();
    if (mode === "guided") {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (mode === "guided" && inputRef.current) {
        inputRef.current.focus();
      } else if (mode === "free" && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const renderGuidedText = () => {
    if (!guidedText) return null;

    const normalizedUserInput = userInput;

    let inputIndex = 0;

    return guidedText.split("").map((char, index) => {
      let color = textColor;
      let bgColor = "transparent";
      let textDecoration = "none";
      let fontWeight = "normal";

      if (char === " " && (index === 0 || guidedText[index - 1] === " ")) {
      } else {
        if (inputIndex < normalizedUserInput.length) {
          if (normalizedUserInput[inputIndex] === char) {
            color = primaryColor;
          } else {
            color = "#ff3030ff";
            textDecoration = "underline solid #ff3030ff";
            fontWeight = "600";
          }
        } else if (inputIndex === normalizedUserInput.length) {
          bgColor = "rgba(196, 196, 196, 0.3)";
        }
        inputIndex++;
      }

      return (
        <span 
          key={index}
          ref={index === 0 ? firstCharRef : null}
          style={{ 
            color: color,
            backgroundColor: bgColor,
            textDecoration: textDecoration,
            textDecorationThickness: '2px',
            textUnderlineOffset: '3px',
            fontWeight: fontWeight,
            transition: 'color 0.7s, background-color 0.1s, text-decoration 0.1s, font-weight 0.1s',
            borderRadius: '2px'
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      ref={boxRef}
      className="flex justify-center items-center m-0 p-0 w-full h-full"
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full h-full rounded-[1vw] py-[1vh] relative cursor-text overflow-hidden transition-all duration-700 flex items-center"
        onClick={handleContainerClick}
        style={{
          backgroundColor: secondaryColor,
          boxShadow: `0 4px 12px ${secondaryColor}60`,
          width: "100%",
          height: "100%",
        }}
      >
        {mode === "free" ? (
          <textarea
            ref={textareaRef}
            value={freeText} 
            onChange={handleFreeTextChange} 
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
            autoFocus 
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full h-full bg-transparent leading-[1.6]
                     text-left outline-none border-none resize-none
                     m-0 p-0
                     font-[Consolas] text-inherit"
            style={{ 
              paddingLeft: `${guidedTextOffset}px`,
              paddingRight: `${guidedTextOffset}px`,
              paddingTop: `${guidedTextOffsetTop}px`,
              fontSize: fontSize,
              color: textColor,
              transition: 'color 0.7s',
              width: "100%",
              minWidth: "1px",
              borderRadius: "1vw", 
              boxSizing: "border-box",
              backgroundClip: "padding-box",
              overflow: "auto",
              caretColor: primaryColor 
            }}
            placeholder="Escribe aquí libremente..."
          ></textarea>
        ) : (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{
                width: "100%",
                marginTop: `${verticalAlignOffset -30}px`
              }}
            >
              <div
                style={{
                  fontSize: fontSize,
                  lineHeight: '1.6',
                  whiteSpace: 'pre',
                  wordBreak: 'break-word',
                  textAlign: 'center',
                  fontFamily: "Consolas"
                }}
              >
                {renderGuidedText()}
              </div>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20"
              autoFocus
              spellCheck="false"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </>
        )}
      </div>
      <style>{`
        textarea::placeholder {
          color: ${textColor};
          opacity: 0.6;
          transition: color 0.7s;
        }
        textarea::-webkit-scrollbar {
          width: 10px;
          background: ${secondaryColor};
          border-radius: 1vw;
        }
        textarea::-webkit-scrollbar-thumb {
          background: ${primaryColor};
          border-radius: 1vw;
          border: 2px solid ${secondaryColor};
        }
        textarea::-webkit-scrollbar-track {
          background: ${secondaryColor};
          border-radius: 1vw;
          margin: 4px 0; /* Deja espacio para las flechas */
        }
        textarea::-webkit-scrollbar-button:single-button {
          display: block;
          height: 16px;
          background: ${secondaryColor};
          border-radius: 50%;
          border: none;
        }
        textarea::-webkit-scrollbar-button:single-button:vertical:decrement {
          background: ${primaryColor};
          margin-top: 2px;
        }
        textarea::-webkit-scrollbar-button:single-button:vertical:increment {
          background: ${primaryColor};
          margin-bottom: 2px;
        }
        /* Firefox */
        textarea {
          scrollbar-width: thin;
          scrollbar-color: ${primaryColor} ${secondaryColor};
          border-radius: 1vw;
        }
      `}</style>
    </div>
  );
}