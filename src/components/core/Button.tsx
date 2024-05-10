import React from "react";

import { StyleProp, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Text, TextProps, Pressable, Box, BoxProps } from "@/atoms";
import { Theme } from "@/themes";
import {
  composeRestyleFunctions,
  useRestyle,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import { useTheme } from "@/hooks";

type RestyleProps = BoxProps & VariantProps<Theme, "buttonVariants">;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  createVariant({ themeKey: "buttonVariants" }),
]);

export interface ButtonProps extends RestyleProps {
  label?: string;
  iconName?: typeof Feather extends Icon<infer U, any> ? U : never;
  iconColor?: string;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
  textVariant?: TextProps["variant"];
  onPress?: () => void;
}

export const Button = (props: ButtonProps) => {
  const {
    onPress,
    label,
    iconName,
    iconColor,
    iconSize,
    iconStyle = {},
    textVariant,
    ...rest
  } = props;

  const [pressed, setPressed] = React.useState(false);

  const pressableProps = useRestyle(restyleFunctions, rest);

  const theme = useTheme();
  const textColor = theme.buttonVariants[rest.variant || "defaults"]
    .color as keyof Theme["colors"];

  const onPressIn = () => {
    setPressed(true);
  };

  const onPressOut = () => {
    setPressed(false);
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Box alignItems="center" flexDirection="row" gap="s" {...pressableProps}>
        {label && (
          <Text
            color={textColor}
            opacity={pressed ? 0.5 : 1}
            variant={textVariant}
          >
            {label}
          </Text>
        )}
        {iconName && (
          <Feather
            opacity={pressed ? 0.5 : 1}
            style={iconStyle}
            color={iconColor || theme.colors.mainForeground}
            name={iconName}
            size={iconSize}
          />
        )}
      </Box>
    </Pressable>
  );
};
