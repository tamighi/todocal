import { Query } from "@tanstack/react-query";
import { DeleteOptions, useDeleteOne } from "../core";
import { Todo } from "@/models";

export const useDeleteOneTodo = (options: DeleteOptions = {}) => {
  const queryKeyFilter = (query: Query, payload: Partial<Todo>) => {
    const [_, __, filter] = query.queryKey;
    if (!filter) return true;

    if (filter === payload.day?.id) return true;
    return false;
  };

  return useDeleteOne("todo", { queryKeyFilter, ...options });
};
