import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useCreate = <R extends Resource>(
  resource: R,
  newData: ResourceTypes[R],
  options: MutateOptions<ResourceTypes[R][]> = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[R][] = []) => [...oldData, newData],
    [],
  );

  const onMutate = async (id: string) => {
    onMutateProp?.(id);
  };

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    mutationFn: () => serviceMap[resource].create(newData),
    optimisticMutationFn,
    additionalMutations,
  });
};
