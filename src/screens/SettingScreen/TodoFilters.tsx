import React from "react";

import { Box, Text } from "@/atoms";
import { Checkbox } from "@/components";
import { TodoFilterName, useTodoFilters } from "@/contexts";

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

  const handleCheck = (filter: TodoFilterName) => {
    setFilter(filter, !filters[filter]);
  };

  return (
    <Box gap="s">
      {filterObjects.map((filter) => {
        return (
          <Box
            key={filter.name}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text>{filter.label}</Text>
            <Checkbox
              checked={filters[filter.name]}
              onPress={() => handleCheck(filter.name)}
            ></Checkbox>
          </Box>
        );
      })}
    </Box>
  );
};
