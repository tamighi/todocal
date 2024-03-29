import { createTheme } from "@shopify/restyle";
import { palette } from "./palette";
import { layout } from "./layout";

const colors = {
  mainBackground: palette.lightOrange,

  mainForeground: palette.black,
  secondaryForeground: palette.grey,

  primary: palette.orange,
  emphasize: palette.darkRed,

  // The chip colors, synonym of tasks.
  chipUrgent: palette.lightRed,
  chipImportant: palette.deepBlue,

  // Adding "_task" at the end for the color picker to find them easily.
  yellow_task: palette.yellow,
  orange_task: palette.pastelOrange,
  red_task: palette.darkRed,
  pink_task: palette.pink,
  purple_task: palette.pastelPurple,
  blue_task: palette.pastelBlue,
  blueTurquoise_task: palette.blueTurquoise,
  green_task: palette.lightGreen,
  brown_task: palette.brown,
  grey_task: palette.lightGrey,
};

const theme = createTheme({
  colors,
  spacing: layout.spacing,
  borderRadii: layout.borderRadii,
  breakpoints: layout.breakpoints,
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
    small: {
      fontSize: 9,
      lineHeight: 11,
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
  textInputVariants: {
    defaults: {
      borderWidth: 1,
      borderRadius: "xs",
      padding: "s",
      borderColor: "secondaryForeground",
    },
  },
  buttonVariants: {
    defaults: {
      paddingVertical: "xs",
      paddingHorizontal: "s",
    },
    outlined: {
      borderWidth: 1,
      borderRadius: "s",
    },
  },
});

export type Theme = typeof theme;
export default theme;
