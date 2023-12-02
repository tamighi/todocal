import { createTheme } from "@shopify/restyle";

// Palette
const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",

  purpleLight: "#8C6FF7",
  greenLight: "#56DCBA",
};

const theme = createTheme({
  // Define what component has what colors
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,

    cardPrimaryBackground: palette.purpleLight,

    chipGreenBackground: palette.greenLight,
  },
  // Set default spacings
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    lg: 24,
    xl: 40,
  },
  // Set default breakpoints
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  // Set default borderRadii
  borderRadii: {
    xs: 4,
    sm: 16,
    md: 24,
    lg: 64,
    hg: 128,
  },
  // Set textVariants
  textVariants: {
    defaults: {
      color: "mainForeground",
      fontSize: 16,
      lineHeight: 24,
    },
    smallChip: {
      fontSize: 8,
    },
  },
  // Set cardVariants
  cardVariants: {
    primary: {
      backgroundColor: "cardPrimaryBackground",
    },
  },
  // Set chipVariants
  chipVariants: {
    defaults: {
      padding: "xs",
      borderRadius: "sm",
    },
    small: {
      paddingVertical: "none",
      paddingHorizontal: "xs",
      borderRadius: "xs",
    },
  },
});

export type Theme = typeof theme;
export default theme;
