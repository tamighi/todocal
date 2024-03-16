import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";
import { MutationContext, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export interface DeleteOptions {
  onSuccess?: (result: UndoMutationResult) => void;
  onMutate?: () => void;
  onError?: (error: Error) => void;
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
    (oldData: ResourceType[] = [], id: string) =>
      oldData.filter((data) => data.id !== id),
    [],
  );

  const onMutate = () => {
    showUndoToast("Item deleted");
    onMutateProp?.();
  };

  const onSuccess = (
    result: UndoMutationResult,
    _: unknown,
    context?: MutationContext,
  ) => {
    if (result.undo) {
      undoMutation(context);
    }
    onSuccessProp?.(result);
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
