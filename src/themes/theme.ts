import { createTheme } from "@shopify/restyle";
import { palette } from "./palette";
import { layout } from "./layout";

const colors = {
  mainBackground: palette.white,
  mainForeground: palette.black,

  primary: palette.purpleLight,

  chipDefaultBackground: palette.greenLight,
  chipDoneBackground: palette.greyLight,
};

const theme = createTheme({
  colors,
  ...layout,
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
