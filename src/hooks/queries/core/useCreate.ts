import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useCreate = <R extends Resource>(
  resource: R,
  options: MutateOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[R][] = [], newData: Partial<ResourceTypes[R]>) =>
      [...oldData, newData] as ResourceTypes[R][],
    [],
  );

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    mutationFn: (newData) => serviceMap[resource].create(newData),
    optimisticMutationFn,
    additionalMutations,
  });
};
