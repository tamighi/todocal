import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";
import { MutationContext, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export interface DeleteOptions {
  onSuccess?: (res: UndoMutationResult) => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate: onMutateProp, onSuccess: onSuccessProp, onError } = options;

  const { mutationFn, showUndoToast, undoMutation } = useUndoMutation(
    (id: string) => serviceMap[resource].delete(id),
  );

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[Resource][] = [], id: string) =>
      oldData.filter((data) => data.id !== id),
    [],
  );

  const onMutate = () => {
    showUndoToast("Item deleted");
    onMutateProp?.();
  };

  const onSuccess = (
    res: UndoMutationResult,
    _: unknown,
    context?: MutationContext,
  ) => {
    if (res.undo) {
      undoMutation(context);
    }
    onSuccessProp?.(res);
  };

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    mutationFn,
    optimisticMutationFn,
    additionalMutations,
  });
};
