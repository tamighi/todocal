import React from "react";

import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Button, ButtonProps } from "./Button";

type Props = {
  name: typeof Feather extends Icon<infer U, any> ? U : never;
  color?: string;
} & Omit<ButtonProps, "iconName" | "iconColor">;

export const IconButton = (props: Props) => {
  const { name, onPress, color, ...rest } = props;

  return (
    <Button
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      iconColor={color}
      iconName={name}
      height={48}
      width={48}
      {...rest}
    />
  );
};
