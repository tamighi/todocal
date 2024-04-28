import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";

import {
  OptimisticMutationContext,
  OptimisticUpdate,
  OptimisticMutateOptions,
  UndoMutationResult,
  useMutation,
  useUndoMutation,
} from "../base";

export type DeleteOptions = {
  onSuccess?: (result: UndoMutationResult) => void;
  onMutate?: () => void;
  onError?: (error: Error) => void;
} & OptimisticMutateOptions;

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError,
    queryKeyFilter,
  } = options;

  const { mutationFn, showUndoToast, onUndoableMutationSuccess } =
    useUndoMutation((payload: Partial<ResourceType<R>> & { id: string }) =>
      serviceMap[resource].delete(payload),
    );

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceType[] = [], payload: ResourceType<R>) => {
      return oldData.filter((data) => data.id !== payload.id);
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
    queryKeyFilter,
  });
};
