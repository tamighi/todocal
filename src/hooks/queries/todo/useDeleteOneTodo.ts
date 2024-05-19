import { Query } from "@tanstack/react-query";
import { DeleteOptions, useDeleteOne } from "../core";
import { Todo } from "@/models";

export const useDeleteOneTodo = (options: DeleteOptions = {}) => {
  const queryKeyFilter = (query: Query, payload: Partial<Todo>) => {
    const [_, __, dayId] = query.queryKey;
    if (!dayId) return true;

    if (dayId === payload.day?.id) return true;

    if (payload.rRule) {
      const date = new Date(dayId as string);
      return payload.rRule.between(date, date, true).length > 0;
    }

    return false;
  };

  return useDeleteOne("todo", { queryKeyFilter, ...options });
};
