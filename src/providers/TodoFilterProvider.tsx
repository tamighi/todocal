import React from "react";

import {
  TodoFilterContext,
  TodoFilter,
  TodoFilterContextProps,
} from "@/contexts";

export const TodoFilterProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [filters, setFilters] = React.useState<TodoFilter>({
    active: false,
    urgent: false,
    important: false,
  });

  const updateFilter = (filter: keyof TodoFilter, value: boolean) => {
    setFilters({ ...filters, [filter]: value });
  };

  const clearFilters = () => {
    setFilters({ active: false, urgent: false, important: false });
  };

  const contextValue: TodoFilterContextProps = {
    filters,
    setFilter: updateFilter,
    clearFilters,
  };

  return (
    <TodoFilterContext.Provider value={contextValue}>
      {children}
    </TodoFilterContext.Provider>
  );
};
