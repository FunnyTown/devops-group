import React, { useState, useEffect } from "react";
import {
  generatePalette,
  getContrastRatio,
  convertColor,
} from "./utils/colorUtils.js";
import "./App.css";

function App() {
  const [palette, setPalette] = useState([]);
  const [lockedCount, setLockedCount] = useState(0);

  useEffect(() => {
    generateNewPalette();
  }, []);

  const generateNewPalette = () => {
    setPalette((prevPalette) => {
      const lockedColorValues = prevPalette.slice(0, lockedCount);
      return generatePalette(lockedColorValues);
    });
  };

  const toggleLock = (index) => {
    if (index === lockedCount) {
      setLockedCount((prevCount) => prevCount + 1);
    } else if (index === lockedCount - 1) {
      setLockedCount((prevCount) => prevCount - 1);
    }
  };

  const resetLocks = () => {
    setLockedCount(0);
  };

  const copyColorCodes = () => {
    const colorCodes = palette
      .map((color) => {
        const { hex, rgb, hsl } = convertColor(color);
        return `${hex} | ${rgb} | ${hsl}`;
      })
      .join("\n");
    navigator.clipboard.writeText(colorCodes);
    alert("Color codes copied to clipboard!");
  };

  return (
    <div className="App">
      <h1>Multi-Color Palette Generator</h1>
      <p>Generate a palette with various colors!</p>
      <div className="palette-container">
        {palette.map((color, index) => (
          <div key={index} className="color-box">
            <div
              className="color-display"
              style={{ backgroundColor: color }}
              onClick={() => {
                navigator.clipboard.writeText(color);
                alert(`Color ${color} copied to clipboard!`);
              }}
            >
              <span
                className="color-text"
                style={{
                  color: getContrastRatio(color) > 4.5 ? "black" : "white",
                }}
              >
                {color}
              </span>
            </div>
            <button
              className="lock-button"
              onClick={() => toggleLock(index)}
              disabled={index !== lockedCount && index !== lockedCount - 1}
            >
              {index < lockedCount ? "🔒" : "🔓"}
            </button>
          </div>
        ))}
      </div>
      <div className="control-buttons">
        <button onClick={generateNewPalette}>Generate Palette</button>
        <button onClick={resetLocks}>Reset Locks</button>
      </div>
      <div className="color-codes">
        <h3>Color Codes:</h3>
        {palette.map((color, index) => {
          const { hex, rgb, hsl } = convertColor(color);
          return (
            <p key={index}>
              {hex} | {rgb} | {hsl}
            </p>
          );
        })}
        <button onClick={copyColorCodes}>Copy Color Codes</button>
      </div>
    </div>
  );
}

export default App;
/*Comment to test Pipeline*/ 