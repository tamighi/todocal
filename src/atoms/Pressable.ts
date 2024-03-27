import { Theme } from "@/themes";
import { createBox } from "@shopify/restyle";
import {
  PressableProps as RNPressableProps,
  Pressable as RNPressable,
} from "react-native";

export const Pressable = createBox<Theme, RNPressableProps>(RNPressable);
export type PressableProps = React.ComponentProps<typeof Pressable>;
