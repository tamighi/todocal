import { createTheme } from "@shopify/restyle";

// Palette
const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  white: "#F0F2F3",
};

const theme = createTheme({
  // Define what component has what colors
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purpleLight,

    $background: palette.white,
    $foreground: palette.black,

    $sidebarBackground: palette.greenLight,
    $sidebarForeground: palette.greenDark,
    $sidebarSeparator: palette.greenLight,
  },
  // Set default spacings
  spacing: {
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
      color: "$foreground",
      fontSize: 16,
      lineHeight: 24,
    },
    sidebar: {
      color: "$sidebarForeground",
      fontWeight: "bold",
      fontSize: 12,
    },
  },
  // Set cardVariants
  cardVariants: {
    primary: {
      backgroundColor: "cardPrimaryBackground",
    },
  },
});

export type Theme = typeof theme;
export default theme;
