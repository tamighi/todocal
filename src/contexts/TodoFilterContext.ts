import React from "react";

export type TodoFilterName = "active" | "urgent" | "important";
export type TodoFilter = { [K in TodoFilterName]: boolean };

export interface TodoFilterContextProps {
  filters: TodoFilter;
  setFilter: (filter: keyof TodoFilter, value: boolean) => void;
  clearFilters: () => void;
}

const filters: TodoFilter = { active: false, urgent: false, important: false };

export const TodoFilterContext = React.createContext<TodoFilterContextProps>({
  filters,
  setFilter: (_: TodoFilterName, __: boolean) => {},
  clearFilters: () => {},
});

export const useTodoFilters = () => React.useContext(TodoFilterContext);
