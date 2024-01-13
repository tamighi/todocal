import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import { Pressable, PressableProps } from "react-native";

const Button = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & PressableProps,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Pressable);

export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
