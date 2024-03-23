import React from "react";

import { Pressable } from "react-native";

import { Box, BoxProps } from "@/atoms";

export type ButtonProps = {
  onPress?: () => void;
  children?: React.ReactNode;
} & BoxProps;

export const Button = (props: ButtonProps) => {
  const { onPress, children, style, ...rest } = props;

  return (
    <Pressable style={style} onPress={onPress}>
      <Box {...rest}>{children}</Box>
    </Pressable>
  );
};
