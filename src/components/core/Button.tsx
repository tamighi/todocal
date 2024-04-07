import React from "react";

import { StyleProp, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Text, TextProps, Pressable, PressableProps } from "@/atoms";
import { Theme } from "@/themes";
import {
  BackgroundColorProps,
  SpacingProps,
  composeRestyleFunctions,
  spacing,
  layout,
  backgroundColor,
  useRestyle,
  LayoutProps,
  createVariant,
  VariantProps,
  color,
  ColorProps,
} from "@shopify/restyle";
import { useTheme } from "@/hooks";

type RestyleProps = SpacingProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  VariantProps<Theme, "buttonVariants">;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  layout,
  backgroundColor,
  color,
  createVariant({ themeKey: "buttonVariants" }),
]);

export interface ButtonProps extends RestyleProps, PressableProps {
  label?: string;
  iconName?: typeof Feather extends Icon<infer U, any> ? U : never;
  iconColor?: string;
  iconStyle?: StyleProp<TextStyle>;
  textVariant?: TextProps["variant"];
}

export const Button = (props: ButtonProps) => {
  const {
    onPress,
    label,
    iconName,
    iconColor,
    iconStyle = {},
    textVariant,
    ...rest
  } = props;
  const [pressed, setPressed] = React.useState(false);

  const pressableProps = useRestyle(restyleFunctions, rest);

  const colors = useTheme().colors;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...pressableProps}
    >
      {label && (
        <Text opacity={pressed ? 0.5 : 1} variant={textVariant}>
          {label}
        </Text>
      )}
      {iconName && (
        <Feather
          opacity={pressed ? 0.5 : 1}
          style={iconStyle}
          color={iconColor || colors.mainForeground}
          name={iconName}
          size={24}
        />
      )}
    </Pressable>
  );
};
