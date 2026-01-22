import p5 from "p5";
import { defaultAvatar } from "../config/defaultAvatar.js";
import { renderAvatar } from "../utils/renderer.js";

export const mountHome = (containerId) => {
  console.log("Mounting Home Page");

  const sketch = (p) => {
    let avatar = { ...defaultAvatar };

    p.setup = () => {
      p.createCanvas(600, 600);
      p.pixelDensity(2);
    };

    p.draw = () => {
      renderAvatar(p, avatar);
    };
  };

  new p5(sketch, document.getElementById(containerId));
};
