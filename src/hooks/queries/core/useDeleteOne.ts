import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";

import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";
import { useMutation } from "./useMutation";
import {
  OptimisticMutationContext,
  OptimisticUpdate,
} from "./useOptimisticUpdate";

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

  const { mutationFn, showUndoToast, onUndoableMutationSuccess } =
    useUndoMutation((id: string) => serviceMap[resource].delete(id));

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceType[] = [], id: string) => {
      return oldData.filter((data) => data.id !== id);
    },
    [],
  );

  const onMutate = () => {
    showUndoToast("Item deleted");
    onMutateProp?.();
  };

  const onSuccess = (
    result: UndoMutationResult,
    _: unknown,
    optimisticMutationContext?: OptimisticMutationContext,
  ) => {
    const allContexts = optimisticMutationContext?.flatMap(
      (contexts) => contexts.contexts,
    );
    onUndoableMutationSuccess(result, allContexts);
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
