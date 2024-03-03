import React from "react";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { useUndoToast } from "@/providers/UndoToastProvider";
import { Resource, ResourceTypes, serviceMap } from "@/services";

interface DeleteOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
) => {
  const { onSuccess: onSuccessProp, onError: onErrorProp } = options;

  const queryClient = useQueryClient();

  const { show } = useUndoToast();
  const undoRef = React.useRef<() => void>();
  const onUndo = React.useCallback(() => undoRef.current?.(), [undoRef]);

  const mutationKey = [resource, "list"];

  const mutationFn = (id: string) => {
    const mutationPromise = new Promise<{ undo: boolean }>(
      (resolve, reject) => {
        const timeout = setTimeout(() => {
          serviceMap[resource]
            .delete(id)
            .then(() => resolve({ undo: false }))
            .catch((err) => reject(err));
        }, 5000);
        const cancelMutation = () => {
          clearTimeout(timeout);
          resolve({ undo: true });
        };
        undoRef.current = cancelMutation;
      },
    );

    return mutationPromise;
  };

  const optimisticUpdate = async (id: string) => {
    await queryClient.cancelQueries({ queryKey: [resource, "list"] });

    const oldListContext = queryClient.getQueriesData<ResourceTypes[R][]>({
      queryKey: mutationKey,
    });

    queryClient.setQueriesData<ResourceTypes[R][]>(
      { queryKey: mutationKey },
      (oldData) => {
        return oldData?.filter((data) => data.id !== id);
      },
    );

    return oldListContext;
  };

  const onSuccess = (
    { undo }: { undo: boolean },
    _: string,
    context?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    if (undo && context) {
      const [queryKey, oldData] = context;
      queryClient.setQueriesData({ queryKey }, oldData);
    } else if (
      // Only invalidate if there are no other mutations.
      !(queryClient.isMutating({ mutationKey }) > 1)
    ) {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    }
    onSuccessProp?.();
  };

  const onError = (
    error: Error,
    _: string,
    oldData?: [QueryKey, ResourceTypes[R][] | undefined][],
  ) => {
    queryClient.setQueriesData({ queryKey: mutationKey }, oldData);
    onErrorProp?.(error);
  };

  const onMutate = async (id: string) => {
    show({ message: "Item deleted", callback: onUndo });
    return optimisticUpdate(id);
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
