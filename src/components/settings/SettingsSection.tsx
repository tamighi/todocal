import React from "react";

import { Box, Text } from "@/atoms";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export const SettingsSection = (props: Props) => {
  const { title, children, defaultOpen = false } = props;

  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Box>
      <Pressable onPress={() => setOpen(!open)}>
        <Box
          padding="s"
          justifyContent="space-between"
          borderWidth={1}
          flexDirection="row"
        >
          <Text variant="subTitle">{title}</Text>
          <Feather name={open ? "chevron-up" : "chevron-down"} size={24} />
        </Box>
      </Pressable>
      <Box visible={open} padding="m">
        {children}
      </Box>
    </Box>
  );
};