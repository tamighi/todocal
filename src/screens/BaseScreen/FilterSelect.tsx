import React from "react";

import { Feather } from "@expo/vector-icons";

import { Dropdown, IconButton } from "@/components";
import { TodoFilterName, useTodoFilters } from "@/contexts";
import { Box, Text } from "@/atoms";
import { useTheme } from "@/hooks";
import { View } from "react-native";

export const FilterSelect = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const { filters, setFilter } = useTodoFilters();
  const ref = React.useRef<View>(null);

  const theme = useTheme();

  const filterLabels = React.useMemo<TodoFilterName[]>(
    () => ["active", "important", "urgent"],
    [],
  );

  const onFilterClick = (item: TodoFilterName) => {
    setFilter(item, !filters[item]);
  };

  const renderItem = (
    filter: TodoFilterName,
    index: number,
    data: string[],
  ) => {
    return (
      <Box
        borderColor="mainForeground"
        borderBottomWidth={data.length === index + 1 ? 0 : 1}
        flexDirection="row"
        alignItems="center"
        p="s"
        g="s"
      >
        <Text style={{ flex: 1 }}>{filter}</Text>
        <Box alignItems="center" justifyContent="center" height={22} width={18}>
          {filters[filter] && (
            <Feather color={theme.colors.mainForeground} name="check" />
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <IconButton
        ref={ref}
        onPress={() => setFilterOpen(!filterOpen)}
        name="filter"
      />
      <Dropdown
        parentRef={ref}
        open={filterOpen}
        renderItem={renderItem}
        onClose={() => setFilterOpen(false)}
        onItemClick={onFilterClick}
        values={filterLabels}
      />
    </>
  );
};
