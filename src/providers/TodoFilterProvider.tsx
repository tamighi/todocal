import React from "react";

import {
  TodoFilterContext,
  TodoFilter,
  TodoFilterContextProps,
  TodoFilterView,
  TodoFilterName,
} from "@/contexts";
import { getAsyncStorageData, setAsyncStorageData } from "@/utils";

// TODO: adapt with select
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
    const newValues = {
      ...filters,
      [view]: { ...filters[view], [filter]: value },
    };

    setAsyncStorageData("settings", newValues);
    setFilters(newValues);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleFilters = () => {
    const newValues = {
      ...filters,
      active: !filters.active,
    };

    setAsyncStorageData("settings", newValues);
    setFilters(newValues);
  };

  const contextValue: TodoFilterContextProps = {
    filters,
    setFilter: updateFilter,
    clearFilters,
    toggleFilters,
  };

  React.useEffect(() => {
    const getStoredFilters = async () => {
      const storedValue = await getAsyncStorageData("settings", {
        jsonParse: true,
      });

      if (storedValue) setFilters(storedValue);
    };

    getStoredFilters();
  }, []);

  return (
    <TodoFilterContext.Provider value={contextValue}>
      {children}
    </TodoFilterContext.Provider>
  );
};
