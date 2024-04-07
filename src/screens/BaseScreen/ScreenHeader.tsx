import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { IconButton } from "@/components";

export const ScreenHeader = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Box flexDirection="row" justifyContent="space-between" bg="mainBackground">
      <IconButton name="settings" onPress={openSettings} />
      <Box flexDirection="row">
        <IconButton name="search" />
        <IconButton name="filter" />
        <IconButton name="tag" />
      </Box>
    </Box>
  );
};
