import React from "react";

import { Box, BoxProps } from "@/atoms";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = BoxProps & {
  checked: boolean;
  onPress?: (check: boolean) => void;
};

export const Checkbox: React.FC<Props> = (props) => {
  const { checked, onPress, ...rest } = props;

  const handlePress = () => {
    onPress?.(!checked);
  };

  return (
    <Pressable onPress={handlePress}>
      <Box
        width={20}
        height={20}
        borderColor="mainForeground"
        borderWidth={2}
        {...rest}
      >
        {checked && <Feather name="check" size={16} />}
      </Box>
    </Pressable>
  );
};
