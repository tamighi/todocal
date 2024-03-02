import React from "react";

import { Box, Text } from "@/atoms";
import { Checkbox } from "@/components";
import { TodoFilterName, TodoFilterView, useTodoFilters } from "@/contexts";

type Filter = {
  name: TodoFilterName;
  label: string;
};

const filterObjects: Filter[] = [
  { name: "active", label: "Active only" },
  { name: "urgent", label: "Urgent only" },
  { name: "important", label: "Important only" },
];

export const TodoFilters = () => {
  const { filters, setFilter } = useTodoFilters();

  const handleCheck = (filter: TodoFilterName, view: TodoFilterView) => {
    setFilter(filter, view, !filters[view][filter]);
  };

  return (
    <Box gap="s">
      {filterObjects.map((filter) => {
        return (
          <Box
            key={filter.name}
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
          >
            <Text>{filter.label}</Text>
            <Box gap="s">
              <Box flexDirection="row" justifyContent="space-between" gap="s">
                <Text>Day</Text>
                <Checkbox
                  checked={filters["day"][filter.name]}
                  onPress={() => handleCheck(filter.name, "day")}
                ></Checkbox>
              </Box>
              <Box flexDirection="row" justifyContent="space-between" gap="s">
                <Text>Month</Text>
                <Checkbox
                  checked={filters["month"][filter.name]}
                  onPress={() => handleCheck(filter.name, "month")}
                ></Checkbox>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
