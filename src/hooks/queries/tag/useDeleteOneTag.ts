import { QueryKey } from "@tanstack/react-query";

import { UndoMutationResult, useDeleteOne, useOptimisticUpdate } from "../core";
import { Todo } from "@/models";

interface DeleteTagOptions {
  onSuccess?: (res: UndoMutationResult) => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}

type TodoContext = [QueryKey, Todo[] | undefined][];

export const useDeleteOneTag = (options: DeleteTagOptions = {}) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
  } = options;

  const { mutate, invalidate, undoMutation } = useOptimisticUpdate([
    "todo",
    "list",
  ]);

  const onMutate = (id: string) => {
    onMutateProp?.();

    return mutate((oldData: Todo[] = []) => {
      const newData = oldData.map((todo) => {
        if (todo.tag?.id === id) {
          return { ...todo, tag: undefined };
        }
        return todo;
      });
      return newData;
    });
  };

  const onSuccess = (
    { undo }: UndoMutationResult,
    _: string,
    context?: TodoContext,
  ) => {
    if (undo) {
      undoMutation(context);
    } else {
      invalidate();
    }

    onSuccessProp?.({ undo });
  };

  const onError = (error: Error, _: string, context?: TodoContext) => {
    undoMutation(context);
    onErrorProp?.(error);
  };

  return useDeleteOne("tag", { onMutate, onSuccess, onError });
};
