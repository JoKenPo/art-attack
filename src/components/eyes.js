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

export const drawEyes_HalfClosed = (p, v, bVertex, colors, trackX, trackY) => {
  p.push();

  // We basically draw normal eyes but the upper eyelid comes down further

  // 1. Sclera (White Part)
  p.fill(colors.sclera);
  p.stroke(0);
  p.strokeWeight(7);

  // Left Eye Sclera - slightly flatter top
  p.beginShape();
  v(-20, 40);
  bVertex(-30, 20, -77, 10, -105, 20); // Top curve lower down
  bVertex(-100, 63, -50, 78, -20, 40);
  p.endShape();

  // Right Eye Sclera
  p.beginShape();
  v(20, 40);
  bVertex(30, 20, 77, 10, 105, 20);
  bVertex(100, 63, 50, 78, 20, 40);
  p.endShape();

  // 2. Pupils (WITH TRACKING) - partial occlusion will be handled by eyelid drawing on top
  p.fill(colors.pupil);
  p.noStroke();
  p.ellipse(-60 + trackX, 35 + trackY, 40, 40); // slightly lower pupil/center
  p.ellipse(60 + trackX, 35 + trackY, 40, 40);

  // 3. Eyelids (Skin Color) - This "closes" the eye halfway
  p.fill(colors.skin);
  p.stroke(0);
  p.strokeWeight(7);

  p.noStroke();
  p.fill(colors.skin);
  p.rect(-115, -20, 110, 50); // Left cover
  p.rect(15, -20, 110, 50); // Right cover

  // 4. Lash Lines (The "Half Closed" look)
  p.stroke(0);
  p.strokeWeight(7);
  p.noFill();

  // Left Lash/Lid Line
  p.beginShape();
  p.vertex(-105, 25);
  p.bezierVertex(-80, 25, -50, 25, -20, 35);
  p.endShape();

  // Right Lash/Lid Line
  p.beginShape();
  p.vertex(20, 35);
  p.bezierVertex(50, 25, 80, 25, 105, 25);
  p.endShape();

  p.pop();
};

export const eyesStyles = {
  default: drawEyes_Default,
  round: drawEyes_Round,
  half_closed: drawEyes_HalfClosed,
};
