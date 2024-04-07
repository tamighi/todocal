import React from "react";

import {
  SpacingProps,
  VariantProps,
  composeRestyleFunctions,
  createVariant,
  spacing,
  useRestyle,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps as RNTextInputProps } from "react-native";
import { useTheme } from "@/hooks";

type RestyleProps = SpacingProps<Theme> &
  VariantProps<Theme, "textInputVariants"> &
  RNTextInputProps & {
    placeholderTextColor?: keyof Theme["colors"];
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  createVariant({ themeKey: "textInputVariants" }),
]);

export const TextInput = ({ ...rest }: RestyleProps) => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme();

  return (
    <BottomSheetTextInput
      {...props}
      placeholderTextColor={theme.colors.secondaryForeground}
    />
  );
};

export type TextInputProps = React.ComponentProps<typeof TextInput>;
