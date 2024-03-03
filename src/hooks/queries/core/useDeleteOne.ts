import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useOptimisticUpdate } from "./useOptimisticUpdate";
import { useUndoMutation } from "./useUndoMutation";

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
  const queryClient = useQueryClient();

  const undoableMutationFn = (id: string) => serviceMap[resource].delete(id);
  const { mutationFn, showUndoToast } = useUndoMutation(undoableMutationFn);

  const optimisticUpdate = useOptimisticUpdate(mutationKey);

  const onMutate = (id: string) => {
    showUndoToast("Item deleted");
    onMutateProp?.();
    return optimisticUpdate.onMutate(
      (oldData: ResourceTypes[R][] = []) =>
        oldData?.filter((data) => data.id !== id),
    );
  };

  const onSuccess = (
    { undo }: { undo: boolean },
    _: string,
    context?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    if (context && undo) {
      context.forEach((query) => {
        const [queryKey, oldData] = query;
        if (undo) {
          queryClient.setQueriesData({ queryKey }, oldData);
        }
      });
    } else {
      optimisticUpdate.onSuccess();
    }

    onSuccessProp?.({ undo });
  };

  const onError = (
    error: Error,
    id: string,
    oldData?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    optimisticUpdate.onError(error, id, oldData);
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
