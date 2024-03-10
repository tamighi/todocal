import React from "react";

import { Box, Text, BoxProps } from "@/atoms";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = BoxProps & {
  checked: boolean;
  onPress?: (check: boolean) => void;
  label?: string;
};

export const Checkbox: React.FC<Props> = (props) => {
  const { checked, onPress, label, ...rest } = props;

  const handlePress = () => {
    onPress?.(!checked);
  };

  return (
    <Box flexDirection="row" gap="s" alignItems="center">
      {label && <Text>{label}</Text>}
      <Pressable onPress={handlePress}>
        <Box
          width={20}
          height={20}
          borderColor="secondaryForeground"
          borderWidth={2}
          {...rest}
        >
          {checked && <Feather name="check" size={16} />}
        </Box>
      </Pressable>
    </Box>
  );
};
