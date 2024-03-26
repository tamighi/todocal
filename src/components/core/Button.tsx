import React from "react";

import { Pressable, StyleProp, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Text, TextProps } from "@/atoms";
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
} from "@shopify/restyle";

type RestyleProps = SpacingProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  VariantProps<Theme, "buttonVariants">;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  layout,
  backgroundColor,
  createVariant({ themeKey: "buttonVariants" }),
]);

export type ButtonProps = {
  onPress?: () => void;
  label?: string;
  iconName?: typeof Feather extends Icon<infer U, any> ? U : never;
  iconColor?: string;
  iconStyle?: StyleProp<TextStyle>;
  textVariant?: TextProps["variant"];
} & RestyleProps;

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

  const viewProps = useRestyle(restyleFunctions, rest);

  const iconStyles = {
    opacity: pressed ? 0.5 : 1,
    //@ts-ignore
    ...iconStyle,
  };

  return (
    <Pressable
      {...viewProps}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      {label && <Text variant={textVariant}>{label}</Text>}
      {iconName && (
        <Feather
          style={iconStyles}
          color={iconColor}
          name={iconName}
          size={24}
        />
      )}
    </Pressable>
  );
};
