// Current version of our application
let VERSION = "1.0";

// This flag controls whether our colour generator is working correctly or not
// For demonstration purposes, it's initially set to false to show the "bug"
let isFixed = false;

// Function generates our random colours
// When isFixed is false, it only produces shades of red (simulating a bug)
// When isFixed is true, it produces a full range of random colours
function generateRandomColour() {
  if (!isFixed) {
    // Bug simulation: Only generates shades of red
    const r = Math.floor(Math.random() * 256);
    return `#${r.toString(16).padStart(2, "0")}0000`;
  } else {
    // Correct functionality: Generates random colours
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
}

// Array of 5 colours using our generateRandomColour function
function generatePalette() {
  const colours = [];
  for (let i = 0; i < 5; i++) {
    colours.push(generateRandomColour());
  }
  return colours;
}

// Function to calculate the contrast ratio to ensure text is readable on any background
function getContrastRatio(colour) {
  const r = parseInt(colour.slice(1, 3), 16);
  const g = parseInt(colour.slice(3, 5), 16);
  const b = parseInt(colour.slice(5, 7), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return (luminance + 0.05) / (1 + 0.05);
}

// Function to display our generated palette on the webpage
function displayPalette(colours) {
  const paletteContainer = document.getElementById("palette-container");
  if (!paletteContainer) {
    console.error("Palette container not found");
    return;
  }
  paletteContainer.innerHTML = ""; // Clear the existing palette
  colours.forEach((colour) => {
    const colourBox = document.createElement("div");
    colourBox.className = "colour-box";
    colourBox.style.backgroundColor = colour;

    const colourText = document.createElement("span");
    colourText.className = "colour-text";
    colourText.textContent = colour;
    colourText.style.color = getContrastRatio(colour) > 4.5 ? "black" : "white";
    colourBox.appendChild(colourText);

    // Add click event listener to copy colour to clipboard
    colourBox.addEventListener("click", function () {
      navigator.clipboard
        .writeText(colour)
        .then(() => {
          alert(`Colour ${colour} copied to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });

    paletteContainer.appendChild(colourBox);
  });
}

// Setting up event listener for the Generate Palette button
const generateBtn = document.getElementById("generate-btn");
if (generateBtn) {
  generateBtn.addEventListener("click", function () {
    const colours = generatePalette();
    displayPalette(colours);
  });
} else {
  console.error("Generate button not found");
}

// Update the version number displayed on the page
function updateVersionDisplay() {
  const versionElement = document.getElementById("version-number");
  if (versionElement) {
    versionElement.textContent = VERSION;
  }
}

// On page load, set up the initial palette
window.onload = function () {
  updateVersionDisplay();
  const colours = generatePalette();
  displayPalette(colours);
};

// To fix the colour generator and update the version, uncomment these lines:

/*
isFixed = true;
VERSION = "1.1";
updateVersionDisplay();
*/
