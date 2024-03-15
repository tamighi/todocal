import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";
import { MutateOptions, useCoreMutation } from "./useCoreMutation";

export const useDeleteOne = <R extends Resource, T extends any>(
  resource: R,
  options: MutateOptions<R, T, UndoMutationResult> = {},
) => {
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const { mutationFn, showUndoToast } = useUndoMutation((id: string) =>
    serviceMap[resource].delete(id),
  );

  const optimisticMutationFn = React.useCallback(
    (id: string, oldData?: ResourceTypes[R][]) =>
      oldData?.filter((data) => data.id !== id),
    [],
  );

  const onMutate = async (id: string) => {
    showUndoToast("Item deleted");

    return onMutateProp?.(id);
  };

  return useCoreMutation(resource, {
    onMutate,
    onSuccess,
    onError,
    mutationFn,
    optimisticMutationFn,
  });
};
