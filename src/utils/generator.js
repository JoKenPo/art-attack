// Helper: String to Hash (Seed)
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const generateAvatarFromId = (id, p, options) => {
  const {
    hairOptions,
    eyesOptions,
    eyebrowsOptions,
    noseOptions,
    mouthOptions,
    glassesOptions,
    earringsOptions,
    hatOptions,
    palettes,
  } = options;

  // 1. Seed the RNG
  const seed = hashCode(id || "default");
  p.randomSeed(seed);

  // 2. Determine Style
  const palette = p.random(palettes);

  return {
    colors: palette,
    style: {
      hair: p.random(hairOptions),
      eyes: p.random(eyesOptions),
      eyebrows: p.random(eyebrowsOptions),
      nose: p.random(noseOptions),
      mouth: p.random(mouthOptions),
      accessories: {
        glasses: p.random(glassesOptions),
        earrings: p.random(earringsOptions),
        hat: p.random(hatOptions),
      },
    },
  };
};
