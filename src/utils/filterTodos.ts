import { TodoFilter } from "@/contexts";
import { Todo } from "@/models";

export const filterTodos = (todos: Todo[] = [], filters: TodoFilter) => {
  const filteredTodos = todos.filter((todo) => {
    if (filters.active && todo.done) return false;
    if (filters.important && !todo.important) return false;
    if (filters.urgent && !todo.urgent) return false;

    return true;
  });
  return filteredTodos;
};
