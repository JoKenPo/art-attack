import "./style.css";
import p5 from "p5";
import { colors as defaultColors } from "./config/colors.js";
import { createBezierTools } from "./utils/bezierShim.js";
import { hairStyles } from "./components/hair.js";
import { accessoryStyles } from "./components/accessories.js";
import {
  drawEars,
  drawHeadShape,
  drawEyebrows,
  drawNose,
  drawMouth,
} from "./components/face.js";
import { eyesStyles } from "./components/eyes.js";

window.onerror = function (message, source, lineno, colno, error) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "10px";
  div.style.right = "10px";
  div.style.backgroundColor = "rgba(255,0,0,0.8)";
  div.style.color = "white";
  div.style.padding = "10px";
  div.style.fontFamily = "monospace";
  div.innerText = `Error: ${message} (Line ${lineno})`;
  document.body.appendChild(div);
};

const sketch = (p) => {
  let avatar = {};

  // Feature Options
  const eyebrowsOptions = ["default", "thin_arched", "thick_straight"];
  const noseOptions = ["default", "pointed", "button"];
  const mouthOptions = ["default", "small", "wide_smile"];
  const hairOptions = Object.keys(hairStyles);
  const eyesOptions = Object.keys(eyesStyles);

  // Accessories Options
  const glassesOptions = Object.keys(accessoryStyles.glasses);
  const earringsOptions = Object.keys(accessoryStyles.earrings);
  const hatOptions = Object.keys(accessoryStyles.hat);

  // Palettes (Simple variations)
  const palettes = [
    { ...defaultColors, bg: "#cb254d", skin: "#f4c4ae", hair: "#000000" },
    { ...defaultColors, bg: "#25cbfa", skin: "#8d5524", hair: "#2a2a2a" },
    { ...defaultColors, bg: "#facb25", skin: "#e0ac69", hair: "#5e3a2a" },
    { ...defaultColors, bg: "#8a25fa", skin: "#ffdbac", hair: "#e6be8a" },
  ];

  let infoPanel;
  let inputField;
  let generateBtn;

  // Helper: String to Hash (Seed)
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const createUI = () => {
    // Info Panel
    infoPanel = document.createElement("div");
    Object.assign(infoPanel.style, {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
      fontFamily: "monospace",
      fontSize: "14px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "15px",
      borderRadius: "8px",
      pointerEvents: "none",
      zIndex: "10",
    });
    document.body.appendChild(infoPanel);

    // Input Container
    const controls = document.createElement("div");
    Object.assign(controls.style, {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "10px",
      zIndex: "10",
    });
    document.body.appendChild(controls);

    // Input Field
    inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter ID / Name...";
    Object.assign(inputField.style, {
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      fontFamily: "monospace",
    });
    // Generate on typing (debounced slightly or just on input)
    inputField.addEventListener("input", (e) => {
      generateFromId(e.target.value);
    });
    controls.appendChild(inputField);

    // Random Button
    generateBtn = document.createElement("button");
    generateBtn.innerText = "🎲 Random";
    Object.assign(generateBtn.style, {
      padding: "10px 15px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#fff",
      fontFamily: "monospace",
      fontWeight: "bold",
    });
    generateBtn.addEventListener("click", () => {
      // Generate random string ID
      const randomId = Math.random().toString(36).substring(7);
      inputField.value = randomId;
      generateFromId(randomId);
    });
    controls.appendChild(generateBtn);
  };

  const updateInfoPanel = (id) => {
    if (!infoPanel) return;
    const { style } = avatar;
    infoPanel.innerHTML = `
      <strong>Avatar ID</strong><br>
      <span style="color: #ffff00;">"${id}"</span><br><br>
      <strong>Stats</strong><br>
      Hair: ${style.hair}<br>
      Eyes: ${style.eyes}<br>
      <hr style="opacity: 0.3; margin: 8px 0;">
      Glasses: ${style.accessories.glasses}<br>
      Earrings: ${style.accessories.earrings}<br>
      Hat: ${style.accessories.hat}<br>
    `;
  };

  const generateFromId = (id) => {
    // 1. Seed the RNG
    const seed = hashCode(id || "default"); // "default" if empty
    p.randomSeed(seed);

    // 2. Determine Style (Deterministically now!)
    const palette = p.random(palettes);
    avatar = {
      colors: palette,
      style: {
        hair: p.random(hairOptions),
        eyes: p.random(eyesOptions),
        eyebrows: p.random(eyebrowsOptions),
        nose: p.random(noseOptions),
        mouth: p.random(mouthOptions),
        accessories: {
          glasses: p.random(glassesOptions),
          earrings: p.random(earringsOptions),
          hat: p.random(hatOptions),
        },
      },
    };

    console.log(`Generated for ID: "${id}" (Seed: ${seed})`);

    // 3. Update UI
    updateInfoPanel(id);
  };

  p.setup = () => {
    const canvas = p.createCanvas(600, 600);
    p.pixelDensity(2);

    createUI();

    // Initial generation: Restoring the "Original" (Chanel Girl)
    // We manually set the properties instead of randomizing
    avatar = {
      colors: palettes[0], // Default red background
      style: {
        hair: "chanel",
        eyes: "default", // Using the original simple eyes
        eyebrows: "default",
        nose: "default",
        mouth: "default",
        accessories: {
          glasses: "none",
          earrings: "none",
          hat: "none",
        },
      },
    };

    inputField.value = "Original";
    updateInfoPanel("Original");
  };

  p.mousePressed = () => {
    // Only generate random if clicking canvas, not UI
    // (p5's mousePressed captures everything, so simple logic:)
    if (
      p.mouseY < p.height &&
      p.mouseY > 0 &&
      p.mouseX > 0 &&
      p.mouseX < p.width
    ) {
      // Create a visual feedback or just allow manual button use?
      // Let's make click random for fun still
      const randomId = Math.random().toString(36).substring(7);
      inputField.value = randomId;
      generateFromId(randomId);
    }
  };

  p.draw = () => {
    const { colors, style } = avatar;

    // --- Initialize Helpers ---
    const { v, bVertex } = createBezierTools(p);

    // --- Vector Movement Logic (ACTIVE) ---
    let center = p.createVector(p.width / 2, p.height / 2);
    let mouse = p.createVector(p.mouseX, p.mouseY);
    let move = p5.Vector.sub(mouse, center);
    move.mult(0.1);
    move.limit(20);

    let panX = move.x;
    let panY = move.y;

    // --- Pupil Tracking Logic ---
    let dX = p.mouseX - p.width / 2;
    let dY = p.mouseY - p.height / 2;
    let angle = p.atan2(dY, dX);
    let pupDist = p.min(15, p.dist(0, 0, dX * 0.2, dY * 0.2));
    let trackX = p.cos(angle) * pupDist;
    let trackY = p.sin(angle) * pupDist;

    p.background(colors.bg);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.scale(1.4);

    p.strokeJoin(p.ROUND);
    p.strokeCap(p.ROUND);
    p.stroke(colors.stroke);
    p.strokeWeight(7);

    // --- PARALLAX LAYERS ---

    // 1. REAR GROUP (Deepest - Inverted Anchor)
    p.push();
    p.translate(panX * -0.05, panY * -0.05);
    // Draw Rear Hair based on selection
    if (hairStyles[style.hair] && hairStyles[style.hair].rear) {
      hairStyles[style.hair].rear(p, v, bVertex, colors);
    }
    drawEars(p, v, bVertex, colors);

    // Earrings (Attach to ears layer roughly)
    const earringsDraw = accessoryStyles.earrings[style.accessories.earrings];
    if (earringsDraw) {
      earringsDraw(p, colors);
    }
    p.pop();

    // 2. FACE SPHERE (Mid - 0.10)
    p.push();
    p.translate(panX * 0.1, panY * 0.1);
    drawHeadShape(p, colors);
    p.pop();

    // 4. EYES (Front - 0.12)
    p.push();
    p.translate(panX * 0.12, panY * 0.12);
    // Draw Eyes based on selection
    if (eyesStyles[style.eyes]) {
      eyesStyles[style.eyes](p, v, bVertex, colors, trackX, trackY);
    }

    // Glasses (Layered over eyes)
    const glassesDraw = accessoryStyles.glasses[style.accessories.glasses];
    if (glassesDraw) {
      glassesDraw(p, colors);
    }
    p.pop();

    // 5. FRONT HAIR & FEATURES (Foreground - 0.15)
    p.push();
    p.translate(panX * 0.15, panY * 0.15);

    // Draw Front Hair based on selection
    if (hairStyles[style.hair] && hairStyles[style.hair].front) {
      hairStyles[style.hair].front(p, v, bVertex, colors);
    }

    // Hats (Layered over Front Hair usually)
    const hatDraw = accessoryStyles.hat[style.accessories.hat];
    if (hatDraw) {
      hatDraw(p, colors);
    }

    // Draw Features individually
    drawEyebrows(p, colors, style.eyebrows);
    drawNose(p, colors, style.nose);
    drawMouth(p, colors, style.mouth);

    p.pop();

    p.pop(); // End Main Transform
  };
};

new p5(sketch, document.getElementById("app"));
