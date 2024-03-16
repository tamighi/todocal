import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useUpdate = <R extends Resource>(
  resource: R,
  newData: ResourceTypes[R],
  options: MutateOptions<ResourceTypes[R][]> = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[R][] = [], newData: ResourceTypes[R]) =>
      oldData.map((data) => {
        if (data.id === newData.id) {
          return newData;
        }
        return data;
      }),
    [],
  );

  const onMutate = async (data: ResourceTypes[R]) => {
    onMutateProp?.(data);
  };

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    mutationFn: () => serviceMap[resource].update(newData),
    optimisticMutationFn,
    additionalMutations,
  });
};
