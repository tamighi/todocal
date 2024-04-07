import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { IconButton } from "@/components";
import { FilterSelect } from "./FilterSelect";

export const ScreenHeader = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Box
      zIndex={2}
      flexDirection="row"
      justifyContent="space-between"
      bg="mainBackground"
    >
      <IconButton name="settings" onPress={openSettings} />
      <Box position="relative" flexDirection="row">
        <IconButton name="search" />
        <IconButton
          onPressIn={() => setFilterOpen(!filterOpen)}
          name="filter"
        />
        <FilterSelect
          filterOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />
        <IconButton name="tag" />
      </Box>
    </Box>
  );
};
