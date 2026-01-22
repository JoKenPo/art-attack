export const drawBeard = (p, colors) => {
  p.push();
  p.fill(colors.hair || "#2a2a2a");
  p.noStroke();

  // FULL BEARD Shape
  // Needs to start high near ears/sideburns, go deeply under chin, and connection to mustache
  p.beginShape();

  // Left Sideburn top - LOWERED again
  p.vertex(-85, 60);

  // Jawline / Chin contour - covering "EVERYTHING" at the bottom
  // going extremely wide and low to cover the oval chin completely
  p.bezierVertex(-100, 100, -80, 190, 0, 190); // VERY Deep chin - bottom point at 0,190 (Head ends at ~155+oval)

  // Right side going up
  p.bezierVertex(80, 190, 100, 100, 85, 60);

  // Now the inner cutout for the mouth/face

  // Going slightly in from Right Sideburn
  p.vertex(85, 60);
  // Cheek line down to mustache area - SCOOPED EXTREMELY LOW
  // Eyes are approx y=10 to y=60. We must NOT cross x=60 before y=70.
  // Start: 85, -20.
  // Ctrl1: 95, 60 (Stay VERY wide and go down past eyes)
  // Ctrl2: 85, 85 (Stay wide until bottom of nose)
  // Target: 45, 80 (Connect to mustache below nose)
  p.bezierVertex(95, 60, 85, 85, 45, 90);

  // Mustache Top Edge (Right)
  // Previous: 40, 75, 20, 70, 0, 78
  // Keeping it low around y=80
  p.bezierVertex(40, 80, 20, 75, 0, 82);
  p.bezierVertex(-20, 75, -40, 80, -45, 90);

  // Cheek line up to Left Sideburn - SCOOPED EXTREMELY LOW
  // Start: -45, 90. Target: -85, 60.
  // Ctrl1: -70, 85
  // Ctrl2: -80, 70
  p.bezierVertex(-70, 85, -80, 70, -85, 60);

  p.endShape(p.CLOSE);

  // If we want it "over the mouth", we don't need a separate hole for the mouth.
  // The shape above basically leaves the mouth covered if the fill is opaque.
  // Actually, wait. The previous shape had an inner hole. This one is a simple polygon?
  // No, p.vertex(-85, -20) ... back to start.
  // The path I drew:
  // 1. Outer jawline (Left Top -> Bottom -> Right Top)
  // 2. Then I continued to inner cheek/mustache line (Right Top -> Mustache Top -> Left Top).
  // This creates a solid shape that covers the chin and the upper lip area (mustache).
  // The MOUTH (y=90-100) will be covered by this shape because I didn't cut a hole for it.
  // This matches "fica por cima da boca".
  // However, usually we want to see the lips or at least the smile?
  // If the user said "boca de sorriso", maybe they want the smile ON TOP of the beard?
  // Or the beard surrounds the mouth but the mustache is heavy.
  // "fica por cima da boca" usually translates to "goes over the mouth" (covers it) or "is situated above the mouth".
  // Given "boca de sorriso" request previously, if I cover it, no smile.
  // Renderer order: Face -> Eyes -> Front (Beard/Eyebrows/Nose/Mouth).
  // Wait, in renderer.js:
  // 1. Rear Layer
  // 2. Face Layer (Head Shape)
  // 3. Eyes Layer
  // 4. Front Layer (Hair Front, Hat, Eyebrows, Nose, Mouth)
  // Where is facialHair? I added it in Face Layer or Front Layer?
  // I added it in Face Layer (Step 31 diff):
  // drawHeadShape...
  // if (facialHair) drawFacialHair...
  // p.pop();
  // ...
  // drawMouth is in Front Layer (Step 12/31).
  // So Mouth is drawn AFTER partial Face layer.
  // Wait, let's check renderer.js again to be sure about Z-index.
  // If beard is in Face Layer, and Mouth is in Front Layer, the MOUTH will be drawn ON TOP of the beard.
  // So the beard can "cover the mouth area" (geometrically occupy the space), but the mouth lines will still be visible on top.
  // That sounds perfect for "full beard" without hiding the expression.

  p.pop();
};

export const facialHairStyles = {
  none: null,
  beard: drawBeard,
};
