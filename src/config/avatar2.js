import { colors as defaultColors } from "./colors.js";

export const avatar2 = {
  colors: {
    ...defaultColors,
    hair: "#583412", // Dark beard/hair
    skin: "#c48c64",
    bg: "#50fa7b",
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
      glasses: "rounded_square", // Based on photo
      earrings: "none",
      hat: "beanie", // Based on photo
    },
  },
};
