import p5 from "p5";
import { createBezierTools } from "./bezierShim.js";
import { hairStyles } from "../components/hair.js";
import { accessoryStyles } from "../components/accessories.js";
import { eyesStyles } from "../components/eyes.js";
import { facialHairStyles } from "../components/facialHair.js";
import {
  drawEars,
  drawHeadShape,
  drawEyebrows,
  drawNose,
  drawMouth,
} from "../components/face.js";

export const renderAvatar = (p, avatar) => {
  const { colors, style } = avatar;

  // --- Initialize Helpers ---
  const { v, bVertex } = createBezierTools(p);

  // --- Vector Movement Logic ---
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

  // --- 1. REAR LAYER ---
  p.push();
  p.translate(panX * -0.05, panY * -0.05);
  if (hairStyles[style.hair] && hairStyles[style.hair].rear) {
    hairStyles[style.hair].rear(p, v, bVertex, colors);
  }
  drawEars(p, v, bVertex, colors, style.ears);
  const earringsDraw = accessoryStyles.earrings[style.accessories.earrings];
  if (earringsDraw) earringsDraw(p, colors);
  p.pop();

  // --- 2. FACE LAYER ---
  p.push();
  p.translate(panX * 0.1, panY * 0.1);
  drawHeadShape(p, colors, style.headShape);

  if (style.facialHair && facialHairStyles[style.facialHair]) {
    facialHairStyles[style.facialHair](p, colors);
  }

  p.pop();

  // --- 3. EYES LAYER ---
  p.push();
  p.translate(panX * 0.12, panY * 0.12);
  if (eyesStyles[style.eyes]) {
    eyesStyles[style.eyes](p, v, bVertex, colors, trackX, trackY);
  }
  const glassesDraw = accessoryStyles.glasses[style.accessories.glasses];
  if (glassesDraw) glassesDraw(p, colors);
  p.pop();

  // --- 4. FRONT LAYER ---
  p.push();
  p.translate(panX * 0.15, panY * 0.15);
  if (hairStyles[style.hair] && hairStyles[style.hair].front) {
    hairStyles[style.hair].front(p, v, bVertex, colors);
  }
  const hatDraw = accessoryStyles.hat[style.accessories.hat];
  if (hatDraw) hatDraw(p, colors);

  drawEyebrows(p, colors, style.eyebrows);
  drawNose(p, colors, style.nose);
  drawMouth(p, colors, style.mouth);
  p.pop();

  p.pop();
};
