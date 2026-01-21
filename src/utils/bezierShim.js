export const createBezierTools = (p) => {
  let lastX = 0;
  let lastY = 0;

  const v = (x, y) => {
    p.vertex(x, y);
    lastX = x;
    lastY = y;
  };

  const bVertex = (cx1, cy1, cx2, cy2, x, y) => {
    const steps = 30;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      // B(t) = u^3*P0 + 3*u^2*t*P1 + 3*u*t^2*P2 + t^3*P3
      const px =
        Math.pow(u, 3) * lastX +
        3 * Math.pow(u, 2) * t * cx1 +
        3 * u * Math.pow(t, 2) * cx2 +
        Math.pow(t, 3) * x;
      const py =
        Math.pow(u, 3) * lastY +
        3 * Math.pow(u, 2) * t * cy1 +
        3 * u * Math.pow(t, 2) * cy2 +
        Math.pow(t, 3) * y;
      p.vertex(px, py);
    }
    lastX = x;
    lastY = y;
  };

  return { v, bVertex };
};
