import React from "react";

export type TodoFilterName = "active" | "urgent" | "important";
export type TodoFilterView = "month" | "day";
export type TodoFilter = {
  [K in TodoFilterView]: { [K in TodoFilterName]: boolean };
};

export interface TodoFilterContextProps {
  filters: TodoFilter;
  setFilter: (
    filter: TodoFilterName,
    view: TodoFilterView,
    value: boolean,
  ) => void;
  clearFilters: () => void;
}

export const TodoFilterContext =
  React.createContext<TodoFilterContextProps | null>(null);

export const useTodoFilters = () => {
  const ctx = React.useContext(TodoFilterContext);
  if (!ctx) throw new Error("Must provide todo context");

  return ctx;
};
