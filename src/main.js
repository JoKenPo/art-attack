import "./style.css";
import p5 from "p5";
import { colors as defaultColors } from "./config/colors.js";
import { createBezierTools } from "./utils/bezierShim.js";
import { hairStyles } from "./components/hair.js";
import {
  drawEars,
  drawHeadShape,
  drawEyebrows,
  drawNose,
  drawMouth,
} from "./components/face.js";
import { eyesStyles } from "./components/eyes.js";

const sketch = (p) => {
  let avatar = {};

  // Feature Options
  const eyebrowsOptions = ["default", "thin_arched", "thick_straight"];
  const noseOptions = ["default", "pointed", "button"];
  const mouthOptions = ["default", "small", "wide_smile"];
  const hairOptions = Object.keys(hairStyles);
  const eyesOptions = Object.keys(eyesStyles);

  // Palettes (Simple variations)
  const palettes = [
    { ...defaultColors, bg: "#cb254d", skin: "#f4c4ae", hair: "#000000" },
    { ...defaultColors, bg: "#25cbfa", skin: "#8d5524", hair: "#2a2a2a" },
    { ...defaultColors, bg: "#facb25", skin: "#e0ac69", hair: "#5e3a2a" },
    { ...defaultColors, bg: "#8a25fa", skin: "#ffdbac", hair: "#e6be8a" },
  ];

  const randomizeAvatar = () => {
    const palette = p.random(palettes);
    avatar = {
      colors: palette,
      style: {
        hair: p.random(hairOptions),
        eyes: p.random(eyesOptions),
        eyebrows: p.random(eyebrowsOptions),
        nose: p.random(noseOptions),
        mouth: p.random(mouthOptions),
      },
    };
    console.log("New Avatar:", avatar.style);
  };

  p.setup = () => {
    const canvas = p.createCanvas(600, 600);
    p.pixelDensity(2);
    randomizeAvatar();

    // Add instruction overlay
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.color = "white";
    div.style.fontFamily = "monospace";
    div.innerText = "Click to randomize";
    document.body.appendChild(div);
  };

  p.mousePressed = () => {
    randomizeAvatar();
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
    p.pop();

    // 5. FRONT HAIR & FEATURES (Foreground - 0.15)
    p.push();
    p.translate(panX * 0.15, panY * 0.15);

    // Draw Front Hair based on selection
    if (hairStyles[style.hair] && hairStyles[style.hair].front) {
      hairStyles[style.hair].front(p, v, bVertex, colors);
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
