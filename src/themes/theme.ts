import { createTheme } from "@shopify/restyle";

// Palette
const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",

  greyLight: "#d3d3d3",
  purpleLight: "#8C6FF7",
  greenLight: "#56DCBA",

  blue: "#4361EE",
};

const theme = createTheme({
  // Define what component has what colors
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,

    primary: palette.purpleLight,

    chipDefaultBackground: palette.greenLight,
    chipDoneBackground: palette.greyLight,
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
    s: 8,
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
    title: {
      fontSize: 40,
      lineHeight: 40,
    },
    subTitle: {
      fontSize: 32,
      lineHeight: 32,
    },
    smallChip: {
      fontSize: 8,
      lineHeight: 20,
    },
  },
  buttonVariants: {
    defaults: {
      backgroundColor: "primary",
      paddingHorizontal: "xs",
      paddingVertical: "xxs",
      borderRadius: "s",
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: "mainBackground",
    },
    primary: {
      backgroundColor: "primary",
    },
  },
  chipVariants: {
    defaults: {
      padding: "xs",
      borderRadius: "xs",
    },
  },
});

export type Theme = typeof theme;
export default theme;
