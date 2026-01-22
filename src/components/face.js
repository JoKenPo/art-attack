export const drawEars = (p, v, bVertex, colors, size = "default") => {
  const headRadius = 250;
  const earX = headRadius / 2 - 5;

  const scale = size === "small" ? 0.7 : 1;

  // Left Ear
  p.push();
  p.translate(-earX, 0);
  p.scale(scale);
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
  p.scale(scale);
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

export const drawHeadShape = (p, colors, shape = "circle") => {
  const headRadius = 250;

  // --- Face (Head) ---
  p.fill(colors.skin);
  p.stroke(0);
  p.strokeWeight(7);

  if (shape === "oval") {
    p.ellipse(0, 15, headRadius, 280);
  } else {
    p.circle(0, 0, headRadius);
  }

  // --- Cheeks (Blush) ---
  p.push();
  p.fill(colors.earShadow);
  p.noStroke();
  p.ellipse(-65, 50, 60, 40);
  p.ellipse(65, 50, 60, 40);
  p.pop();
};

export const drawEyebrows = (p, colors, style = "default") => {
  p.fill(colors.hair || 0);
  p.noStroke();

  if (style === "default") {
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
  } else if (style === "thin_arched") {
    // Left Brow
    p.push();
    p.stroke(0);
    p.strokeWeight(4);
    p.noFill();
    p.arc(-45, -25, 40, 20, p.PI, 0);
    p.pop();

    // Right Brow
    p.push();
    p.stroke(0);
    p.strokeWeight(4);
    p.noFill();
    p.arc(45, -25, 40, 20, p.PI, 0);
    p.pop();
  } else if (style === "thick_straight") {
    // Left Brow
    p.push();
    p.translate(-45, -20);
    p.rectMode(p.CENTER);
    p.rotate(0.1);
    p.rect(0, 0, 45, 12, 5);
    p.pop();

    // Right Brow
    p.push();
    p.translate(45, -20);
    p.rectMode(p.CENTER);
    p.rotate(-0.1);
    p.rect(0, 0, 45, 12, 5);
    p.pop();
  } else if (style === "thicker_straight") {
    // Left Brow
    p.push();
    p.translate(-45, -20);
    p.rectMode(p.CENTER);
    p.rotate(0.1);
    p.rect(0, 0, 45, 18, 5); // Thicker height
    p.pop();

    // Right Brow
    p.push();
    p.translate(45, -20);
    p.rectMode(p.CENTER);
    p.rotate(-0.1);
    p.rect(0, 0, 45, 18, 5); // Thicker height
    p.pop();
  }
};

export const drawNose = (p, colors, style = "default") => {
  // --- Nose ---
  p.stroke(0);
  p.noFill();
  p.strokeWeight(5);

  if (style === "default") {
    p.arc(0, 60, 20, 6, 0.2, p.PI - 0.2);
  } else if (style === "pointed") {
    p.beginShape();
    p.vertex(-5, 50);
    p.vertex(0, 65);
    p.vertex(5, 50);
    p.endShape();
  } else if (style === "button") {
    p.arc(0, 55, 15, 10, 0, p.PI);
  }
};

export const drawMouth = (p, colors, style = "default") => {
  // --- Mouth Area ---
  if (style === "default") {
    p.noStroke();
    p.fill(colors.earShadow);
    p.arc(0, 100, 20, 10, 0, p.PI); // Lower lip

    p.fill(colors.upperLipShadow);
    p.arc(0, 88, 22, 10, p.PI, 0); // Upper lip shadow

    p.stroke(0);
    p.strokeWeight(6);
    p.noFill();
    p.line(-20, 91, 20, 91); // Mouth line
  } else if (style === "small") {
    p.fill(colors.earShadow);
    p.noStroke();
    p.circle(0, 95, 15);
  } else if (style === "wide_smile") {
    p.noFill();
    p.stroke(0);
    p.strokeWeight(6);
    p.arc(0, 90, 50, 30, 0, p.PI);
  }
};
