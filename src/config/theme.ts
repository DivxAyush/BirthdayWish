// Central theme/token system derived from the reference video
export const theme = {
  colors: {
    // Intro scene - deep hot pink from reference
    introBg: "#E01E6B",
    introBgDeep: "#C0155A",
    introBgLight: "#F0357A",
    gridLine: "rgba(255, 255, 255, 0.08)",

    // Heart tree scene - warm peach/cream
    heartTreeBg: "#FAE8DC",
    heartTreeBgLight: "#FFF5EE",
    heartTreeGlow: "#FFD6C0",
    treeTrunk: "#5C3A3A",
    heartPink: "#F06292",
    heartHotPink: "#E91E8C",
    heartGold: "#F5A623",
    heartPeach: "#FF8A65",

    // Cake scene - deep purple/dark
    cakeBg: "#1A0A2E",
    cakeBgMid: "#2D1054",
    cakeBgGlow: "#4A1A7A",
    cakeBody: "#D4A85A",
    cakeFrosting: "#F5E6C8",
    candleFlame: "#FFB830",
    confettiPink: "#F48FB1",
    confettiPurple: "#CE93D8",
    confettiBlue: "#90CAF9",
    confettiYellow: "#FFF176",

    // Balloon scene
    balloon1: "#FF6B9D",
    balloon2: "#FF8E53",
    balloon3: "#A78BFA",
    balloon4: "#34D399",
    balloon5: "#60A5FA",
    balloon6: "#F472B6",

    // Letter scene
    letterBg: "#FDF6FF",
    letterPaper: "#FFFBFF",
    envelopeBody: "#F9A8D4",
    envelopeDark: "#EC4899",

    // Final scene
    finalBg: "#1A0A2E",

    // Text colors
    textWhite: "#FFFFFF",
    textPink: "#F06292",
    textGold: "#F5A623",
    textMuted: "rgba(255,255,255,0.65)",
    textDark: "#3D1A47",
  },

  glow: {
    pink: "0 0 40px rgba(240, 98, 146, 0.5), 0 0 80px rgba(240, 98, 146, 0.25)",
    gold: "0 0 30px rgba(245, 166, 35, 0.6), 0 0 60px rgba(245, 166, 35, 0.3)",
    white: "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)",
    purple: "0 0 40px rgba(167, 139, 250, 0.5)",
  },

  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Nunito', sans-serif",
    handwritten: "'Dancing Script', cursive",
    accent: "'Pacifico', cursive",
  },
} as const;

export type Theme = typeof theme;
