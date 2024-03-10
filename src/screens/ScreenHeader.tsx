import React from "react";

import { Feather } from "@expo/vector-icons";

import { Box } from "@/atoms";
import { useTodoFilters } from "@/contexts";
import { useNavigation } from "@/hooks";
import { getCurrentMonthId } from "@/utils";
import { Pressable } from "react-native";

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
      <Pressable
        style={{
          margin: 4,
          opacity: filters.active && hasFilters() ? 1 : 0.4,
        }}
        onPress={toggleFilters}
      >
        <Feather name="filter" size={22} />
      </Pressable>
      <Pressable style={{ margin: 4 }} onPress={navigateToday}>
        <Feather name="home" size={22} />
      </Pressable>
      <Pressable style={{ margin: 4 }} onPress={openSettings}>
        <Feather name="settings" size={22} />
      </Pressable>
    </Box>
  );
};
