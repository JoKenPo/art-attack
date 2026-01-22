import { colors as defaultColors } from "./colors.js";

export const customAvatar = {
  colors: {
    ...defaultColors,
    hair: "#2a2a2a", // Dark beard/hair
    bg: "#25cbfa", // Nice blue background
    hat: "#facb25", // Yellow beanie
  },
  style: {
    headShape: "oval",
    ears: "small", // Custom property
    hair: "short", // Assuming short hair under beanie
    facialHair: "beard", // Custom property
    eyes: "half_closed",
    eyebrows: "thicker_straight", // Custom property
    nose: "default",
    mouth: "wide_smile", // Close to "boca de sorriso"
    accessories: {
      glasses: "rounded_square", // Based on photo (Custom)
      earrings: "cone",
      hat: "beanie", // Based on photo
    },
  },
};
