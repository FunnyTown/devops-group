import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { generatePalette } from "./src/utils/colorUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/generate-palette", (req, res) => {
  const palette = generatePalette();
  res.json({ palette });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
