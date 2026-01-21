export const drawEars = (p, v, bVertex, colors) => {
  const headRadius = 250;
  const earX = headRadius / 2 - 5;

  // Left Ear
  p.push();
  p.translate(-earX, 0);
  p.fill(colors.skin);
  p.stroke(0);
  p.strokeWeight(7);
  p.beginShape();
  v(0, -30);
  bVertex(-50, -40, -60, 0, -50, 20);
  bVertex(-40, 40, 0, 40, 0, 40);
  p.endShape();
  p.noStroke();
  p.fill(colors.earShadow);
  p.ellipse(-25, 5, 20, 30);
  p.noFill();
  p.stroke(0);
  p.strokeWeight(5);
  p.beginShape();
  v(0, -10);
  bVertex(-20, -10, -35, -5, -35, 10);
  p.endShape();
  p.pop();

  // Right Ear
  p.push();
  p.translate(earX, 0);
  p.fill(colors.skin);
  p.stroke(0);
  p.strokeWeight(7);
  p.beginShape();
  v(0, -30);
  bVertex(50, -40, 60, 0, 50, 20);
  bVertex(40, 40, 0, 40, 0, 40);
  p.endShape();
  p.noStroke();
  p.fill(colors.earShadow);
  p.ellipse(25, 5, 20, 30);
  p.noFill();
  p.stroke(0);
  p.strokeWeight(5);
  p.beginShape();
  v(0, -10);
  bVertex(20, -10, 35, -5, 35, 10);
  p.endShape();
  p.pop();
};

export const drawHeadShape = (p, colors) => {
  const headRadius = 250;

  // --- Face (Head) ---
  p.fill(colors.skin);
  p.stroke(0);
  p.strokeWeight(7);
  p.circle(0, 0, headRadius);

  // --- Cheeks (Blush) ---
  p.push();
  p.fill(colors.earShadow);
  p.noStroke();
  p.ellipse(-65, 50, 60, 40);
  p.ellipse(65, 50, 60, 40);
  p.pop();
};

export const drawFeatures = (p, colors) => {
  // --- Eyebrows ---
  p.fill(0);
  p.noStroke();

  // Left Brow
  p.push();
  p.translate(-45, -15);
  p.rotate(0.3);
  p.ellipse(0, 0, 40, 18);
  p.pop();

  // Right Brow
  p.push();
  p.translate(45, -15);
  p.rotate(-0.3);
  p.ellipse(0, 0, 40, 18);
  p.pop();

  // --- Nose ---
  p.stroke(0);
  p.noFill();
  p.strokeWeight(5);
  p.arc(0, 60, 20, 6, 0.2, p.PI - 0.2);

  // --- Mouth Area ---
  p.noStroke();
  p.fill(colors.earShadow);
  p.arc(0, 100, 20, 10, 0, p.PI); // Lower lip

  p.fill(colors.upperLipShadow);
  p.arc(0, 88, 22, 10, p.PI, 0); // Upper lip shadow

  p.stroke(0);
  p.strokeWeight(6);
  p.noFill();
  p.line(-20, 91, 20, 91); // Mouth line
};
