import React from "react";

import { QueryKey } from "@tanstack/react-query";

import { Resource, ResourceType, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import { OptimisticUpdate } from "./useOptimisticUpdate";

export const useCreate = <R extends Resource>(
  resource: R,
  options: MutateOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate, onSuccess, onError } = options;

  const optimisticMutationFn = React.useCallback(
    (
      oldData: ResourceType<R>[] = [],
      newData: Partial<ResourceType<R>>,
      queryKey: QueryKey,
    ) => {
      console.log(queryKey, newData);
      return [...oldData, newData] as ResourceType<R>[];
    },
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
