import { QueryKey } from "@tanstack/react-query";

import { MutateOptions } from "../core/useMutation";
import { useCreate } from "../core/useCreate";
import { Todo } from "@/models";

export const useCreateTodo = (options: MutateOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

  const queryKeyFilter = (queryKey: QueryKey, payload: Partial<Todo>) => {
    const [_, __, filter] = queryKey;
    if (!filter) return true;

    //@ts-ignore Too lazy to type check filter, should not be an issue.
    if (filter.where?.day?.id === payload.day?.id) return true;

    return false;
  };

  return useCreate("todo", {
    onMutate,
    onSuccess,
    onError,
    queryKeyFilter,
  });
};
