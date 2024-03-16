import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useUpdate = <R extends Resource>(
  resource: R,
  options: MutateOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceTypes[R][] = [], newData: Partial<ResourceTypes[R]>) =>
      oldData.map((data) => {
        if (data.id === newData.id) {
          return newData as ResourceTypes[R];
        }
        return data;
      }),
    [],
  );

  const onMutate = async (data: Partial<ResourceTypes[R]>) => {
    onMutateProp?.(data);
  };

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    //@ts-expect-error TODO
    mutationFn: (newData) => serviceMap[resource].update(newData),
    optimisticMutationFn,
    additionalMutations,
  });
};
