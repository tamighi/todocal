import React from "react";

import { Feather } from "@expo/vector-icons";
import type { Icon } from "@expo/vector-icons/build/createIconSet";

import { Button, ButtonProps } from "./Button";

type Props = {
  name: typeof Feather extends Icon<infer U, any> ? U : never;
  color?: string;
} & ButtonProps;

export const IconButton = (props: Props) => {
  const { name, onPress, color, ...rest } = props;

  return (
    <Button
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      height={48}
      width={48}
      {...rest}
    >
      <Feather color={color} name={name} size={24} />
    </Button>
  );
};
