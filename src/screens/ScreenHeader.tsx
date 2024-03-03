import React from "react";

import { Feather } from "@expo/vector-icons";

import { Box, Button } from "@/atoms";
import { useTodoFilters } from "@/contexts";
import { useNavigation } from "@/hooks";
import { getCurrentMonthId } from "@/utils";

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
      <Button
        style={{ margin: 4, display: hasFilters() ? "flex" : "none" }}
        variant="icon"
        onPress={toggleFilters}
      >
        <Feather name="filter" size={22} />
      </Button>
      <Button style={{ margin: 4 }} variant="icon" onPress={navigateToday}>
        <Feather name="home" size={22} />
      </Button>
      <Button style={{ margin: 4 }} variant="icon" onPress={openSettings}>
        <Feather name="settings" size={22} />
      </Button>
    </Box>
  );
};
