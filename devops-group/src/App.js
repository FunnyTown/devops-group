import React, { useState, useEffect } from "react";
import { generatePalette, getContrastRatio } from "./utils/colorUtils";
import "./App.css";

function App() {
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    generateNewPalette();
  }, []);

  const generateNewPalette = () => {
    setPalette(generatePalette());
  };

  return (
    <div className="App">
      <h1>Multi-Color Palette Generator</h1>
      <p>Generate a palette with various colors!</p>
      <div className="palette-container">
        {palette.map((color, index) => (
          <div
            key={index}
            className="color-box"
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
        ))}
      </div>
      <button onClick={generateNewPalette}>Generate Palette</button>
    </div>
  );
}

export default App;
