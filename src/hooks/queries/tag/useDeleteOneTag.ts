import { QueryKey, useMutation } from "@tanstack/react-query";

import { tagService } from "@/services";
import {
  UndoMutationResult,
  useOptimisticUpdate,
  useUndoMutation,
} from "../core";
import { Tag, Todo } from "@/models";

interface DeleteOptions {
  onSuccess?: ({ undo }: { undo: boolean }) => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}

interface TagContext {
  tag: [QueryKey, Tag[] | undefined][];
  todo: [QueryKey, Todo[] | undefined][];
}

export const useDeleteOneTag = (options: DeleteOptions = {}) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
  } = options;

  const mutationKey = ["tag", "list"];

  const { mutationFn, showUndoToast } = useUndoMutation((id: string) =>
    tagService.delete(id),
  );

  const {
    mutate: mutateTag,
    invalidate: invalidateTag,
    undoMutation: undoTagMutation,
  } = useOptimisticUpdate(mutationKey);

  const {
    mutate: mutateTodo,
    invalidate: invalidateTodo,
    undoMutation: undoTodoMutation,
  } = useOptimisticUpdate(["todo", "list"]);

  const onMutate = async (id: string) => {
    showUndoToast("Item deleted");
    onMutateProp?.();

    return {
      tag: await mutateTag(
        (oldData: Tag[] = []) => oldData?.filter((data) => data.id !== id),
      ),
      todo: await mutateTodo((oldData: Todo[] = []) => {
        const newData = oldData.map((todo) => {
          if (todo.tag?.id === id) {
            return { ...todo, tag: undefined };
          }
          return todo;
        });
        return newData;
      }),
    };
  };

  const onSuccess = (
    { undo }: UndoMutationResult,
    _: string,
    context?: TagContext,
  ) => {
    if (undo) {
      undoTagMutation(context?.tag);
      undoTodoMutation(context?.todo);
    } else {
      invalidateTag();
      invalidateTodo();
    }

    onSuccessProp?.({ undo });
  };

  const onError = (error: Error, _: string, context?: TagContext) => {
    undoTagMutation(context?.tag);
    undoTodoMutation(context?.todo);
    onErrorProp?.(error);
  };

  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onMutate,
    onSuccess,
    onError,
  });

  return mutation;
};
