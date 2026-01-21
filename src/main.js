import "./style.css";
import p5 from "p5";
import { colors } from "./config/colors.js";
import { createBezierTools } from "./utils/bezierShim.js";
import { drawRearHair, drawFrontHair } from "./components/hair.js";
import { drawEars, drawHeadShape, drawFeatures } from "./components/face.js";
import { drawEyes } from "./components/eyes.js";

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 600);
    p.pixelDensity(2);
  };

  p.draw = () => {
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
    // Both Rear Hair and Ears now move OPPOSITE to the face (-0.05)
    // This creates a strong pivot point for the head rotation.
    p.push();
    p.translate(panX * -0.05, panY * -0.05);
    drawRearHair(p, v, bVertex, colors);
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
    drawEyes(p, v, bVertex, colors, trackX, trackY);
    p.pop();

    // 5. FRONT HAIR & FEATURES (Foreground - 0.15)
    p.push();
    p.translate(panX * 0.15, panY * 0.15);
    drawFrontHair(p, v, bVertex, colors);
    drawFeatures(p, colors);
    p.pop();

    p.pop(); // End Main Transform
  };
};

new p5(sketch, document.getElementById("app"));
