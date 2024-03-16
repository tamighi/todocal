import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useUpdate = <R extends Resource>(
  resource: R,
  options: MutateOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate: onMutateProp, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceType<R>[] = [], newData: Partial<ResourceType<R>>) =>
      oldData.map((data) => {
        if (data.id === newData.id) {
          return { ...data, ...newData };
        }
        return data;
      }),
    [],
  );

  const onMutate = async (data: Partial<ResourceType<R>>) => {
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
