import { Tag, Todo } from "@/models";

import { DeleteOptions, useUpdate } from "../core";
import { OptimisticUpdate } from "../base";

export const useUpdateTag = (options: DeleteOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

  const todoMutation: OptimisticUpdate<Todo[], Tag> = {
    mutationKey: ["todo", "list"],
    optimisticMutationFn: (oldData, newData) => {
      return oldData?.map((todo) => {
        if (todo.tag?.id === newData.id) {
          return { ...todo, tag: newData };
        }
        return todo;
      });
    },
  };

  return useUpdate("tag", { onMutate, onSuccess, onError }, [todoMutation]);
};
