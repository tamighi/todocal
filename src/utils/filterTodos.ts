import { TodoFilter, TodoFilterView } from "@/contexts";
import { Todo } from "@/models";

export const filterTodos = (
  todos: Todo[] = [],
  view: TodoFilterView,
  filters: TodoFilter,
) => {
  const filteredTodos = todos.filter((todo) => {
    if (filters.active === false) return true;
    if (filters[view].active && todo.done) return false;
    if (filters[view].important && !todo.important) return false;
    if (filters[view].urgent && !todo.urgent) return false;

    return true;
  });
  return filteredTodos;
};
