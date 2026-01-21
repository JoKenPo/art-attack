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
  p.fill(colors.hair);
  p.noStroke();

  // Messy short back
  p.beginShape();
  v(0, -140);
  bVertex(-80, -160, -120, -120, -135, -50);
  bVertex(-140, 0, -120, 60, -90, 80); // Nape
  bVertex(-50, 90, 50, 90, 90, 80);
  bVertex(120, 60, 140, 0, 135, -50);
  bVertex(120, -120, 80, -160, 0, -140);
  p.endShape();
};

export const drawFrontHair_Short = (p, v, bVertex, colors) => {
  p.push();
  p.fill(colors.hair);
  p.noStroke();

  // Textured Bangs
  p.beginShape();
  v(-130, -80); // Start left temple
  // Jagged bangs across forehead
  bVertex(-110, -20, -80, -20, -60, -60);
  bVertex(-40, -10, -20, -40, 0, -20);
  bVertex(30, -50, 60, -10, 80, -60);
  bVertex(110, -20, 120, -60, 130, -80);
  // Top volume
  bVertex(120, -140, 0, -150, -130, -80);
  p.endShape();

  // Sideburns / Side wisps
  p.beginShape();
  v(-130, -80);
  bVertex(-140, -40, -135, 20, -120, 40); // Left sideburn
  bVertex(-110, 20, -115, -40, -110, -60);
  p.endShape();

  p.beginShape();
  v(130, -80);
  bVertex(140, -40, 135, 20, 120, 40); // Right sideburn
  bVertex(110, 20, 115, -40, 110, -60);
  p.endShape();

  p.pop();
};

export const drawRearHair_Long = (p, v, bVertex, colors) => {
  p.fill(colors.hair);
  p.noStroke();

  // Left Flowing Side
  p.beginShape();
  v(0, -150);
  bVertex(-120, -160, -160, -50, -170, 50);
  bVertex(-180, 150, -160, 250, -80, 280); // Bottom curve
  bVertex(-40, 260, -20, 200, 0, 150); // Inner return
  p.endShape();

  // Right Flowing Side
  p.beginShape();
  v(0, -150);
  bVertex(120, -160, 160, -50, 170, 50);
  bVertex(180, 150, 160, 250, 80, 280);
  bVertex(40, 260, 20, 200, 0, 150);
  p.endShape();

  // Fill middle gap
  p.beginShape();
  v(-80, 200);
  bVertex(-40, 280, 40, 280, 80, 200);
  bVertex(0, 150, 0, 150, -80, 200);
  p.endShape();
};

export const drawFrontHair_Long = (p, v, bVertex, colors) => {
  p.push();
  p.fill(colors.hair);
  p.noStroke();

  // Elegant side sweep
  p.beginShape();
  v(-100, -120);
  // Left sweep
  bVertex(-130, -50, -135, 50, -120, 150);
  bVertex(-100, 220, -60, 220, -80, 150); // End tip
  bVertex(-90, 80, -80, -20, -20, -110); // Inner edge
  p.endShape();

  p.beginShape();
  v(100, -120);
  // Right sweep
  bVertex(130, -50, 135, 50, 120, 150);
  bVertex(100, 220, 60, 220, 80, 150);
  bVertex(90, 80, 80, -20, 20, -110);
  p.endShape();

  // Center part / top
  p.beginShape();
  v(0, -130);
  bVertex(-50, -120, -100, -80, -120, -30); // Left bang
  bVertex(-100, -80, -50, -100, 0, -90); // Underside left
  bVertex(50, -100, 100, -80, 120, -30); // Right bang
  bVertex(100, -80, 50, -120, 0, -130); // Underside right
  p.endShape();

  p.pop();
};

export const drawRearHair_Afro = (p, v, bVertex, colors) => {
  p.fill(colors.hair);
  p.noStroke();

  // Cloud-like bubbly shape
  p.beginShape();
  v(0, -180);
  // Top Left
  bVertex(-60, -180, -120, -160, -150, -120);
  // Mid Left
  bVertex(-180, -80, -180, 0, -160, 60);
  // Bottom Left
  bVertex(-140, 100, -100, 120, -60, 110);
  // Neck area
  bVertex(-30, 100, 30, 100, 60, 110);
  // Bottom Right
  bVertex(100, 120, 140, 100, 160, 60);
  // Mid Right
  bVertex(180, 0, 180, -80, 150, -120);
  // Top Right
  bVertex(120, -160, 60, -180, 0, -180);
  p.endShape();
};

export const drawFrontHair_Afro = (p, v, bVertex, colors) => {
  p.push();
  p.fill(colors.hair);
  p.noStroke();

  // Tight textured hairline
  p.beginShape();
  v(-160, -80);
  // Series of small curves for texture
  bVertex(-140, -110, -110, -130, -80, -135);
  bVertex(-40, -140, 40, -140, 80, -135);
  bVertex(110, -130, 140, -110, 160, -80);

  // Sideburns / Volume framing face
  bVertex(150, -40, 140, 0, 130, 40);
  bVertex(145, 0, 155, -40, 160, -80); // Return
  p.endShape();

  // Additional puff on top left
  p.beginShape();
  v(-160, -80);
  bVertex(-150, -40, -140, 0, -130, 40);
  bVertex(-145, 0, -155, -40, -160, -80);
  p.endShape();

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
  long: {
    rear: drawRearHair_Long,
    front: drawFrontHair_Long,
  },
  afro: {
    rear: drawRearHair_Afro,
    front: drawFrontHair_Afro,
  },
};
