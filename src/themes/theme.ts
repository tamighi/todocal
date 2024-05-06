import { createTheme } from "@shopify/restyle";
import { palette } from "./palette";
import { layout } from "./layout";

// TODO: Specific color for no tag in tagColorPicker & tagSelect & todoChipColorInfoBox & settingsTagList
export const tagColorPalette = {
  yellow: palette.yellow,
  orange: palette.pastelOrange,
  red: palette.darkRed,
  lightTed: palette.lightRed,
  pink: palette.pink,
  blue: palette.pastelBlue,
  blueTurquoise: palette.blueTurquoise,
  green: palette.lightGreen,
  brown: palette.brown,
  grey: palette.lightGrey,
};

const colors = {
  // BG
  mainBackground: palette.darkPurple,
  secondaryBackground: palette.lightPurple,

  // FG
  mainForeground: palette.white,
  secondaryForeground: palette.lightGrey,
  emphasizeForeground: palette.pastelRed,

  // Success
  success: palette.pastelGreen,
  danger: palette.pastelRed,

  // Utils
  black: palette.black,
};

const theme = createTheme({
  colors,
  spacing: layout.spacing,
  borderRadii: layout.borderRadii,
  textVariants: {
    defaults: {
      color: "mainForeground",
      fontSize: 16,
      lineHeight: 24,
    },
    subTitle: {
      fontSize: 32,
      lineHeight: 32,
    },
    small: {
      fontSize: 9,
      lineHeight: 11,
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: "secondaryBackground",
    },
    elevated: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
  },
  chipVariants: {
    defaults: {
      borderRadius: "xxs",
      backgroundColor: "mainBackground",
    },
  },
  textInputVariants: {
    defaults: {
      borderWidth: 1,
      borderRadius: "xs",
      padding: "s",
      borderColor: "mainForeground",
      color: "mainForeground",
    },
  },
  buttonVariants: {
    defaults: {
      backgroundColor: "mainBackground",
      padding: "s",
      color: "emphasizeForeground",
    },
    outlined: {
      borderWidth: 1,
      borderRadius: "s",
      paddingVertical: "xs",
      borderColor: "mainForeground",
      color: "mainForeground",
    },
  },
});

export type Theme = typeof theme;
export default theme;
