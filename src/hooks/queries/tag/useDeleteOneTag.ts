import { Todo } from "@/models";

import { DeleteOptions, useDeleteOne } from "../core";
import { OptimisticUpdate } from "../base";

export const useDeleteOneTag = (options: DeleteOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

  const todoMutation: OptimisticUpdate<Todo[]> = {
    mutationKey: ["todo", "list"],
    optimisticMutationFn: (oldData, payload) => {
      const newData = oldData?.map((todo) => {
        if (todo.tag?.id === payload.id) {
          return { ...todo, tag: undefined };
        }
        return todo;
      });
      return newData;
    },
  };

  return useDeleteOne("tag", { onMutate, onSuccess, onError }, [todoMutation]);
};
