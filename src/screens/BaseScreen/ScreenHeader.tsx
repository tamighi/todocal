import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { IconButton } from "@/components";
import { FilterSelect } from "./FilterSelect";

export const ScreenHeader = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  const openTagList = () => {
    navigation.navigate("TagList");
  };

  return (
    <Box
      zIndex={2}
      flexDirection="row"
      justifyContent="space-between"
      bg="mainBackground"
    >
      <IconButton name="settings" onPress={openSettings} />
      <Box flexDirection="row">
        <IconButton name="search" />
        <FilterSelect />
        <IconButton onPress={openTagList} name="tag" />
      </Box>
    </Box>
  );
};
