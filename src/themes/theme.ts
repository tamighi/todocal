import { createTheme } from "@shopify/restyle";
import { palette } from "./palette";
import { layout } from "./layout";

const colors = {
  mainBackground: palette.lightOrange,
  mainForeground: palette.black,

  primary: palette.orange,

  chipDefaultColor: palette.greenLight,
  chipUrgentColor: palette.red,
  chipImportantColor: palette.blue,
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
      fontSize: 9,
      lineHeight: 16,
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
      borderRadius: "xxs",
    },
  },
});

export type Theme = typeof theme;
export default theme;
