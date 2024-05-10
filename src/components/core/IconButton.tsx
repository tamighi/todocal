import React from "react";

import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Button, ButtonProps } from "./Button";

type Props = {
  name: typeof Feather extends Icon<infer U, any> ? U : never;
  color?: string;
} & Omit<ButtonProps, "iconName" | "iconColor" | "color">;

export const IconButton = React.forwardRef((props: Props, ref) => {
  const { name, onPress, color, iconSize = 24, ...rest } = props;

  return (
    <Button
      ref={ref}
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      iconColor={color}
      iconName={name}
      padding="sm"
      iconSize={iconSize}
      {...rest}
    />
  );
});
