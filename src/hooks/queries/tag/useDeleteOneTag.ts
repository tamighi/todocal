import { Todo } from "@/models";

import { DeleteOptions, OptimisticUpdate, useDeleteOne } from "../core";

export const useDeleteOneTag = (options: DeleteOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

  const todoMutation: OptimisticUpdate<Todo[]> = {
    mutationKey: ["todo", "list"],
    optimisticMutationFn: (oldData, id) => {
      const newData = oldData?.map((todo) => {
        if (todo.tag?.id === id) {
          return { ...todo, tag: undefined };
        }
        return todo;
      });
      return newData;
    },
  };

  return useDeleteOne("tag", { onMutate, onSuccess, onError }, [todoMutation]);
};
