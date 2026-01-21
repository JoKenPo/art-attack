export const drawEyes_Default = (p, v, bVertex, colors, trackX, trackY) => {
  p.push();

  // 1. Sclera (White Part)
  p.fill(colors.sclera);
  p.stroke(0);
  p.strokeWeight(7);

  // Left Eye Sclera
  p.beginShape();
  v(-20, 40);
  bVertex(-30, 10, -77, -3, -105, 16);
  bVertex(-100, 63, -50, 78, -20, 40);
  p.endShape();

  // Right Eye Sclera
  p.beginShape();
  v(20, 40);
  bVertex(30, 10, 77, -3, 105, 16);
  bVertex(100, 63, 50, 78, 20, 40);
  p.endShape();

  // 2. Pupils (WITH TRACKING)
  p.fill(colors.pupil);
  // p.noStroke();
  // Tracking added to coordinates
  p.ellipse(-60 + trackX, 25 + trackY, 40, 40);
  p.ellipse(60 + trackX, 25 + trackY, 40, 40);

  // 3. Upper Part to Hide Eyes (Skin Mask)
  p.fill(colors.skin);
  p.noStroke();

  // Left Mask
  p.beginShape();
  v(-15, 40);
  bVertex(-26, 6, -82, -8, -110, 14);
  bVertex(-75, -50, 10, -15, -15, 40);
  p.endShape();

  // Right Mask
  p.beginShape();
  v(15, 40);
  bVertex(26, 6, 82, -8, 110, 14);
  bVertex(75, -50, -10, -15, 15, 40);
  p.endShape();

  // 4. Eyelashes
  p.stroke(0);
  p.strokeWeight(6);
  p.noFill();

  // Left Eye Lashes
  p.line(-32, 22, -24, 12);
  p.line(-54, 10, -50, 0);
  p.line(-76, 6, -78, -4);

  // Right Eye Lashes
  p.line(32, 22, 24, 12);
  p.line(54, 10, 50, 0);
  p.line(76, 6, 78, -4);

  p.pop();
};

export const drawEyes_Round = (p, v, bVertex, colors, trackX, trackY) => {
  p.push();
  // Simple big round eyes
  p.fill(colors.sclera);
  p.stroke(0);
  p.strokeWeight(5);

  p.circle(-60, 30, 60);
  p.circle(60, 30, 60);

  p.fill(colors.pupil);
  p.noStroke();
  p.circle(-60 + trackX, 30 + trackY, 25);
  p.circle(60 + trackX, 30 + trackY, 25);

  p.pop();
};

export const eyesStyles = {
  default: drawEyes_Default,
  round: drawEyes_Round,
};
