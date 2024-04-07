import React from "react";

import {
  SpacingProps,
  VariantProps,
  composeRestyleFunctions,
  createVariant,
  spacing,
  useRestyle,
} from "@shopify/restyle";
import { TextStyle } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";

import { Theme } from "@/themes";
import { useTheme } from "@/hooks";

export type InputHandle = {
  setValue: (v: string) => void;
};

type RestyleProps = SpacingProps<Theme> &
  VariantProps<Theme, "textInputVariants"> &
  Omit<BottomSheetTextInputProps, "style"> & {
    placeholderTextColor?: keyof Theme["colors"];
    style?: TextStyle;
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  createVariant({ themeKey: "textInputVariants" }),
]);

export const TextInput = React.forwardRef<InputHandle, RestyleProps>(
  (
    {
      value: valueProp = "",
      onChangeText: onChangeTextProp,
      ...rest
    }: RestyleProps,
    ref,
  ) => {
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    React.useImperativeHandle(ref, () => ({
      setValue: (v) => setValue(v),
    }));

    const onChangeText = (text: string) => {
      setValue(text);
      onChangeTextProp?.(text);
    };

    // @ts-ignore He wants the value prop apparently
    const props = useRestyle(restyleFunctions, rest);
    const theme = useTheme();

    return (
      <BottomSheetTextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.secondaryForeground}
      />
    );
  },
);

export type TextInputProps = React.ComponentProps<typeof TextInput>;
