import React from "react";

import { Box, Text } from "@/atoms";
import { Checkbox } from "@/components";

type FilterName = "done" | "urgent" | "important";
type FilterChecked = { [K in FilterName]: boolean };
type Filter = {
  name: FilterName;
  label: string;
};

const filters: Filter[] = [
  { name: "done", label: "Active only" },
  { name: "urgent", label: "Urgent only" },
  { name: "important", label: "Important only" },
];

export const TodoFilters = () => {
  const [checked, setChecked] = React.useState<FilterChecked>({
    done: false,
    urgent: false,
    important: false,
  });

  const handleCheck = (filter: FilterName) => {
    setChecked((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <Box gap="s">
      {filters.map((filter) => {
        return (
          <Box
            key={filter.name}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text>{filter.label}</Text>
            <Checkbox
              checked={checked[filter.name]}
              onPress={() => handleCheck(filter.name)}
            ></Checkbox>
          </Box>
        );
      })}
    </Box>
  );
};
