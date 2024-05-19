import { Query } from "@tanstack/react-query";

import { Todo } from "@/models";

import { MutateOptions } from "../base";
import { useCreate } from "../core";

export const useCreateTodo = (options: MutateOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

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

  return useCreate("todo", {
    onMutate,
    onSuccess,
    onError,
    queryKeyFilter,
  });
};
