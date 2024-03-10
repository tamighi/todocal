import React from "react";

import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
  spacing,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps as RNTextInputProps } from "react-native";

type RestyleProps = SpacingProps<Theme> &
  VariantProps<Theme, "textInputVariants"> &
  RNTextInputProps;

export const TextInput = createRestyleComponent<RestyleProps, Theme>(
  [spacing, createVariant({ themeKey: "textInputVariants" })],
  BottomSheetTextInput,
);

export type TextInputProps = React.ComponentProps<typeof TextInput>;
