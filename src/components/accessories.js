export const drawGlasses_Round = (p, colors) => {
  p.push();
  p.stroke(0);
  p.strokeWeight(4);
  p.noFill(); // Glass is clear usually, or maybe slight tint? Let's keep clear for now.

  // Left Lens
  p.circle(-60, 25, 50);
  // Right Lens
  p.circle(60, 25, 50);

  // Bridge
  p.arc(0, 25, 40, 40, p.PI + 0.5, -0.5); // Small arch between

  // Arms (Temples) - going back towards ears
  p.line(-85, 25, -115, 10);
  p.line(85, 25, 115, 10);

  p.pop();
};

export const drawGlasses_RoundedSquare = (p, colors) => {
  p.push();
  p.stroke("brown");
  p.strokeWeight(10);
  p.noFill();

  p.rectMode(p.CENTER);

  // Left Lens - Rounded bottom, flatter top
  // x, y, w, h, tl, tr, br, bl
  p.rect(-60, 35, 100, 80, 15, 15, 50, 50);

  // Right Lens
  p.rect(60, 35, 100, 80, 15, 15, 50, 50);

  // Bridge - Connected between the inner edges
  p.arc(0, 25, 20, 20, p.PI + 0.5, -0.5);

  // Arms (Temples)
  // Connect to outer edges
  p.line(-115, 20, -135, 5);
  p.line(115, 20, 135, 5);

  p.pop();
};

export const drawGlasses_Square = (p, colors) => {
  p.push();
  p.stroke(0);
  p.strokeWeight(4);
  p.noFill();
  p.rectMode(p.CENTER);

  // Left Lens
  p.rect(-60, 25, 55, 45, 5);
  // Right Lens
  p.rect(60, 25, 55, 45, 5);

  // Bridge
  p.line(-32, 25, 32, 25);

  p.pop();
};

export const drawEarrings_Hoops = (p, colors) => {
  p.push();
  p.noFill();
  p.stroke("gold"); // Gold earrings
  p.strokeWeight(3);

  // Left
  p.circle(-125, 30, 20);

  // Right
  p.circle(125, 30, 20);

  p.pop();
};

export const drawEarrings_Studs = (p, colors) => {
  p.push();
  p.fill("silver");
  p.noStroke();

  // Left
  p.circle(-125, 20, 8);

  // Right
  p.circle(125, 20, 8);

  p.pop();
};

export const drawEarrings_Cone = (p, colors) => {
  p.push();
  p.fill("silver"); // Edgy look
  p.noStroke();

  // Draw inverted truncated cones - Small but sticking out (Outer ear)

  // Left Earring - Pushed out to x ~ -135 (ear tip)
  p.beginShape();
  p.vertex(-135, 25); // Top Left (Narrow connection)
  p.vertex(-131, 25); // Top Right
  p.vertex(-128, 40); // Bottom Right (Wide)
  p.vertex(-138, 40); // Bottom Left
  p.endShape(p.CLOSE);

  // Right Earring - Pushed out to x ~ 135 (ear tip)
  p.beginShape();
  p.vertex(131, 25); // Top Left
  p.vertex(135, 25); // Top Right
  p.vertex(138, 40); // Bottom Right
  p.vertex(128, 40); // Bottom Left
  p.endShape(p.CLOSE);

  p.pop();
};

export const drawHat_Beanie = (p, colors) => {
  p.push();
  p.fill(colors.hat || (colors.bg === "#25cbfa" ? "#cb254d" : "#25cbfa")); // Use custom hat color or contrast
  p.stroke(0);
  p.strokeWeight(5);

  // Main dome
  p.arc(0, -90, 260, 240, p.PI, 0);
  // Fold/Rim
  p.rectMode(p.CENTER);
  p.rect(0, -90, 270, 60, 20);

  p.pop();
};

export const drawHat_Cap = (p, colors) => {
  p.push();
  p.fill(30); // Dark cap
  p.stroke(0);
  p.strokeWeight(5);

  // Crown
  p.arc(0, -100, 250, 200, p.PI, 0);

  // Brim (Visor) - simple stylized
  p.fill(10);
  p.rectMode(p.CENTER);
  p.rect(0, -100, 280, 20, 5);

  p.pop();
};

export const accessoryStyles = {
  glasses: {
    none: null,
    round: drawGlasses_Round,
    square: drawGlasses_Square,
    rounded_square: drawGlasses_RoundedSquare,
  },
  earrings: {
    none: null,
    hoops: drawEarrings_Hoops,
    studs: drawEarrings_Studs,
    cone: drawEarrings_Cone,
  },
  hat: {
    none: null,
    beanie: drawHat_Beanie,
    cap: drawHat_Cap,
  },
};
