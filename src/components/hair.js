export const drawRearHair_Chanel = (p, v, bVertex, colors) => {
  p.fill(colors.hair);
  p.noStroke();

  // Left Rear
  p.beginShape();
  v(0, -150);
  bVertex(-115, -170, -135, -68, -143, -37);
  bVertex(-151, -6, -168, 4, -178, 10);
  bVertex(-170, 12, -165, 10, -160, 7);
  bVertex(-178, 20, -182, 54, -160, 65);
  bVertex(-164, 52, -160, 43, -157, 34);
  bVertex(-162, 58, -150, 76, -122, 83);
  bVertex(-122, 80, -122, 76, -122, 72);
  bVertex(-115, 100, -80, 105, 0, 100);
  p.endShape();

  // Right Rear
  p.beginShape();
  v(0, -150);
  bVertex(115, -170, 135, -68, 143, -37);
  bVertex(151, -6, 168, 4, 178, 10);
  bVertex(170, 12, 165, 10, 160, 7);
  bVertex(178, 20, 182, 54, 160, 65);
  bVertex(164, 52, 160, 43, 157, 34);
  bVertex(162, 58, 150, 76, 122, 83);
  bVertex(122, 80, 122, 76, 122, 72);
  bVertex(115, 100, 80, 105, 0, 100);
  p.endShape();
};

export const drawFrontHair_Chanel = (p, v, bVertex, colors) => {
  p.push();
  p.fill(colors.hair);
  p.noStroke();

  // Front Bangs (Center Box)
  p.rectMode(p.CENTER);
  p.rect(0, -50, 190, 40, 10);
  p.ellipse(0, -90, 200, 100);

  // Side Length Right
  p.beginShape();
  v(60, -80);
  bVertex(105, -10, 97, 92, 55, 85);
  bVertex(60, 100, 74, 102, 93, 99);
  bVertex(140, 92, 160, -35, 100, -92);
  p.endShape();

  // Side Length Left
  p.beginShape();
  v(-60, -80);
  bVertex(-105, -10, -97, 92, -55, 85);
  bVertex(-60, 100, -74, 102, -93, 99);
  bVertex(-140, 92, -160, -35, -100, -92);
  p.endShape();

  // Skin Cutouts (Triangles)
  p.fill(colors.skin);
  // Left cuts
  p.triangle(-70, -20, -58, -55, -56, -20);
  p.triangle(-50, -20, -40, -40, -40, -20);
  // Right cuts (Mirrored)
  p.triangle(70, -20, 58, -55, 56, -20);
  p.triangle(50, -20, 40, -40, 40, -20);

  p.pop();
};

export const drawRearHair_Short = (p, v, bVertex, colors) => {
  // Simple short hair back
  p.fill(colors.hair);
  p.noStroke();
  p.arc(0, -20, 260, 280, p.PI, 0);
};

export const drawFrontHair_Short = (p, v, bVertex, colors) => {
  p.push();
  p.fill(colors.hair);
  p.noStroke();

  // Simple messy bangs
  p.beginShape();
  p.vertex(-100, -80);
  p.quadraticVertex(-50, -20, 0, -60);
  p.quadraticVertex(50, -20, 100, -80);
  p.vertex(100, -150);
  p.vertex(-100, -150);
  p.endShape(p.CLOSE);

  p.pop();
};

export const hairStyles = {
  chanel: {
    rear: drawRearHair_Chanel,
    front: drawFrontHair_Chanel,
  },
  short: {
    rear: drawRearHair_Short,
    front: drawFrontHair_Short,
  },
};
