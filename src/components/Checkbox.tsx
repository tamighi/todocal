import React from "react";

import { Box, BoxProps, Text } from "@/atoms";
import { Pressable } from "react-native";

type Props = BoxProps & {
  initialState: boolean;
  onPress?: (check: boolean) => void;
};

export const Checkbox: React.FC<Props> = (props) => {
  const { initialState, onPress, ...rest } = props;

  const [checked, setChecked] = React.useState(initialState);

  const handlePress = () => {
    setChecked(!checked);
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
        {checked && <Text>X</Text>}
      </Box>
    </Pressable>
  );
};
