const { expect } = require("chai");
const {
  generateRandomColor,
  generatePalette,
  getContrastRatio,
} = require("../src/utils/colorUtils");

describe("Color Utilities", () => {
  describe("generateRandomColor", () => {
    it("should return a valid hex color", () => {
      const color = generateRandomColor();
      expect(color).to.match(/^#[0-9A-F]{6}$/i);
    });
  });

  describe("generatePalette", () => {
    it("should return an array of 5 colors", () => {
      const palette = generatePalette();
      expect(palette).to.have.lengthOf(5);
      palette.forEach((color) => {
        expect(color).to.match(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe("getContrastRatio", () => {
    it("should return a number between 0 and 1", () => {
      const ratio = getContrastRatio("#000000");
      expect(ratio).to.be.within(0, 1);
    });
  });
});
