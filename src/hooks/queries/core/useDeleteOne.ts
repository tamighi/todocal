import { QueryKey, useMutation } from "@tanstack/react-query";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useOptimisticUpdate } from "./useOptimisticUpdate";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";

interface DeleteOptions {
  onSuccess?: ({ undo }: { undo: boolean }) => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
  } = options;

  const mutationKey = [resource, "list"];

  const { mutationFn, showUndoToast } = useUndoMutation((id: string) =>
    serviceMap[resource].delete(id),
  );
  const { mutate, invalidate, undoMutation } = useOptimisticUpdate(mutationKey);

  const onMutate = (id: string) => {
    showUndoToast("Item deleted");
    onMutateProp?.();

    return mutate(
      (oldData: ResourceTypes[R][] = []) =>
        oldData?.filter((data) => data.id !== id),
    );
  };

  const onSuccess = (
    { undo }: UndoMutationResult,
    _: string,
    context?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    if (undo) {
      undoMutation(context);
    } else {
      invalidate();
    }

    onSuccessProp?.({ undo });
  };

  const onError = (
    error: Error,
    _: string,
    context?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    undoMutation(context);
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
