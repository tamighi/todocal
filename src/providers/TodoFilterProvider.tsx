import React from "react";

import {
  TodoFilterContext,
  TodoFilter,
  TodoFilterContextProps,
  TodoFilterName,
} from "@/contexts";
import { getAsyncStorageData, setAsyncStorageData } from "@/utils";

const defaultFilters: TodoFilter = {
  urgent: false,
  important: false,
  active: false,
};

export const TodoFilterProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [filters, setFilters] = React.useState<TodoFilter>(defaultFilters);

  const updateFilter = (filter: TodoFilterName, value: boolean) => {
    const newValues = {
      ...filters,
      [filter]: value,
    };

    setAsyncStorageData("settings", newValues);
    setFilters(newValues);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const contextValue: TodoFilterContextProps = {
    filters,
    setFilter: updateFilter,
    clearFilters,
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
