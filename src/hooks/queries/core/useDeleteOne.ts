import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";
import { useMutation } from "./useMutation";
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
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const { mutationFn, showUndoToast } = useUndoMutation((id: string) =>
    serviceMap[resource].delete(id),
  );

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[R][] = [], id: string) =>
      oldData.filter((data) => data.id !== id),
    [],
  );

  const onMutate = async () => {
    showUndoToast("Item deleted");
    onMutateProp?.();
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
