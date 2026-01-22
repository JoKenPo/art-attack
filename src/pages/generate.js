import p5 from "p5";
import { defaultAvatar } from "../config/defaultAvatar.js";
import { renderAvatar } from "../utils/renderer.js";
import {
  createInfoPanel,
  updateInfoPanel,
  createGeneratorUI,
} from "../utils/ui.js";
import { generateAvatarFromId } from "../utils/generator.js";
import { colors as defaultColors } from "../config/colors.js";
import { hairStyles } from "../components/hair.js";
import { eyesStyles } from "../components/eyes.js";
import { accessoryStyles } from "../components/accessories.js";

// Re-defining options here or importing from a shared config would be better
const options = {
  eyebrowsOptions: ["default", "thin_arched", "thick_straight"],
  noseOptions: ["default", "pointed", "button"],
  mouthOptions: ["default", "small", "wide_smile"],
  hairOptions: Object.keys(hairStyles),
  eyesOptions: Object.keys(eyesStyles),
  glassesOptions: Object.keys(accessoryStyles.glasses),
  earringsOptions: Object.keys(accessoryStyles.earrings),
  hatOptions: Object.keys(accessoryStyles.hat),
  palettes: [
    { ...defaultColors, bg: "#cb254d", skin: "#f4c4ae", hair: "#000000" },
    { ...defaultColors, bg: "#25cbfa", skin: "#8d5524", hair: "#2a2a2a" },
    { ...defaultColors, bg: "#facb25", skin: "#e0ac69", hair: "#5e3a2a" },
    { ...defaultColors, bg: "#8a25fa", skin: "#ffdbac", hair: "#e6be8a" },
  ],
};

export const mountGenerate = (containerId) => {
  console.log("Mounting Generate Page");

  const sketch = (p) => {
    let avatar = { ...defaultAvatar };
    let infoPanel;
    let uiControls;

    p.setup = () => {
      p.createCanvas(600, 600);
      p.pixelDensity(2);

      infoPanel = createInfoPanel();

      const handleGenerate = (id) => {
        avatar = generateAvatarFromId(id, p, options);
        updateInfoPanel(infoPanel, id, avatar.style);
      };

      uiControls = createGeneratorUI(handleGenerate);

      // Initial Trigger
      handleGenerate(uiControls.inputField.value);
    };

    p.mousePressed = () => {
      if (
        p.mouseY < p.height &&
        p.mouseY > 0 &&
        p.mouseX > 0 &&
        p.mouseX < p.width
      ) {
        const randomId = Math.random().toString(36).substring(7);
        if (uiControls && uiControls.inputField) {
          uiControls.inputField.value = randomId;
          avatar = generateAvatarFromId(randomId, p, options);
          updateInfoPanel(infoPanel, randomId, avatar.style);
        }
      }
    };

    p.draw = () => {
      renderAvatar(p, avatar);
    };
  };

  new p5(sketch, document.getElementById(containerId));
};
