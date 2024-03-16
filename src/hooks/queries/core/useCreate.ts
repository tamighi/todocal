import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";
import { MutateOptions, useMutation } from "./useMutation";
import {
  OptimisticMutateOptions,
  OptimisticUpdate,
} from "./useOptimisticUpdate";

export const useCreate = <R extends Resource>(
  resource: R,
  options: MutateOptions & OptimisticMutateOptions = {},
  additionalMutations?: OptimisticUpdate[],
) => {
  const { onMutate, onSuccess, onError, queryKeyFilter } = options;

  const optimisticMutationFn = React.useCallback(
    (oldData: ResourceType<R>[] = [], newData: Partial<ResourceType<R>>) => {
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
    queryKeyFilter,
  });
};
