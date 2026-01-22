import p5 from "p5";
import { avatar2 } from "../config/avatar2.js";
import { renderAvatar } from "../utils/renderer.js";

export const mountAvatar2 = (containerId) => {
  console.log("Mounting Avatar 2");

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(600, 600);
      p.pixelDensity(2);
    };

    p.draw = () => {
      renderAvatar(p, avatar2);
    };
  };

  new p5(sketch, document.getElementById(containerId));
};
