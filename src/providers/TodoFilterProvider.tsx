import React from "react";

import {
  TodoFilterContext,
  TodoFilter,
  TodoFilterContextProps,
  TodoFilterView,
  TodoFilterName,
} from "@/contexts";

const defaultFilter: TodoFilter[TodoFilterView] = {
  urgent: false,
  important: false,
  active: false,
};

const defaultFilters: TodoFilter = {
  day: defaultFilter,
  month: defaultFilter,
  active: true,
};

export const TodoFilterProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [filters, setFilters] = React.useState<TodoFilter>(defaultFilters);

  const updateFilter = (
    filter: TodoFilterName,
    view: TodoFilterView,
    value: boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [view]: { ...prev[view], [filter]: value },
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleFilters = () => {
    setFilters((prev) => ({ ...prev, active: !prev.active }));
  };

  const contextValue: TodoFilterContextProps = {
    filters,
    setFilter: updateFilter,
    clearFilters,
    toggleFilters,
  };

  return (
    <TodoFilterContext.Provider value={contextValue}>
      {children}
    </TodoFilterContext.Provider>
  );
};
