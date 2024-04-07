import React from "react";

export type TodoFilterName = "active" | "urgent" | "important";
export type TodoFilter = {
  [K in TodoFilterName]: boolean;
};

export interface TodoFilterContextProps {
  filters: TodoFilter;
  setFilter: (filter: TodoFilterName, value: boolean) => void;
  clearFilters: () => void;
}

export const TodoFilterContext =
  React.createContext<TodoFilterContextProps | null>(null);

export const useTodoFilters = () => {
  const ctx = React.useContext(TodoFilterContext);
  if (!ctx) throw new Error("Must provide todo filter context");

  return ctx;
};
