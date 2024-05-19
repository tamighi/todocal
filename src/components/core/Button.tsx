import React from "react";

import { TextStyle } from "react-native";
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
  iconStyle?: TextStyle;
  textVariant?: TextProps["variant"];
  onPress?: () => void;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  const {
    onPress,
    label,
    iconName,
    iconColor,
    iconSize,
    iconStyle = {},
    textVariant,
    textStyle,
    disabled = false,
    ...rest
  } = props;

  const [pressed, setPressed] = React.useState(false);

  const boxProps = useRestyle(restyleFunctions, rest);

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
    <Pressable
      ref={ref}
      onPress={!disabled ? onPress : null}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Box alignItems="center" flexDirection="row" gap="s" {...boxProps}>
        {label && (
          <Text
            color={textColor}
            opacity={pressed || disabled ? 0.5 : 1}
            variant={textVariant}
            style={textStyle}
          >
            {label}
          </Text>
        )}
        {iconName && (
          <Feather
            opacity={pressed || disabled ? 0.5 : 1}
            style={iconStyle}
            color={iconColor || theme.colors.mainForeground}
            name={iconName}
            size={iconSize}
          />
        )}
      </Box>
    </Pressable>
  );
});
