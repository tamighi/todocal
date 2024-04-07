import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Dropdown, IconButton } from "@/components";

export const ScreenHeader = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  const onFilterClick = (item: string) => {
    setFilterOpen(false);
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
        <Box position="relative">
          <IconButton
            onPressIn={() => setFilterOpen(!filterOpen)}
            name="filter"
          />
          <Dropdown
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            onItemClick={onFilterClick}
            values={["test"]}
          />
        </Box>
        <IconButton name="tag" />
      </Box>
    </Box>
  );
};
