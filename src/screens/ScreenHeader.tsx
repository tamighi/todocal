import React from "react";

import { Box } from "@/atoms";
import { useTodoFilters } from "@/contexts";
import { useNavigation } from "@/hooks";
import { getCurrentMonthId } from "@/utils";
import { IconButton } from "@/components";

export const ScreenHeader = () => {
  const navigation = useNavigation();
  const { toggleFilters, filters } = useTodoFilters();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToday = () => {
    navigation.navigate("Month", { monthId: getCurrentMonthId() });
  };

  const hasFilters = React.useCallback(() => {
    for (const filter of Object.values(filters)) {
      if (typeof filter === "object") {
        if (Object.values(filter).findIndex((v) => v === true) !== -1) {
          return true;
        }
      }
    }
    return false;
  }, [filters]);

  return (
    <Box flexDirection="row" justifyContent="flex-end">
      <IconButton
        name="filter"
        onPress={toggleFilters}
        opacity={filters.active && hasFilters() ? 1 : 0.4}
      />
      <IconButton name="home" onPress={navigateToday} />
      <IconButton name="settings" onPress={openSettings} />
    </Box>
  );
};
