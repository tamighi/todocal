import React from "react";

import { Resource, ResourceType, serviceMap } from "@/services";

import {
  MutateFns,
  MutateOptions,
  OptimisticMutateOptions,
  OptimisticUpdate,
  useMutation,
} from "../base";

export const useUpdate = <R extends Resource>(
  resource: R,
  options: MutateOptions &
    Partial<
      Pick<
        MutateFns<ResourceType<R>[], Partial<ResourceType<R>>>,
        "optimisticMutationFn"
      >
    > &
    OptimisticMutateOptions = {},
  additionalMutations?: OptimisticUpdate<any, ResourceType<R>>[],
) => {
  const {
    onMutate: onMutateProp,
    onSuccess,
    onError,
    optimisticMutationFn: optimisticMutationFnProp,
    queryKeyFilter,
  } = options;

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

  const onMutate = async (data: Partial<ResourceType<R>> & { id: string }) => {
    onMutateProp?.(data);
  };

  return useMutation([resource, "list"], {
    onMutate,
    onSuccess,
    onError,
    mutationFn: (newData) => serviceMap[resource].update(newData),
    optimisticMutationFn: optimisticMutationFnProp ?? optimisticMutationFn,
    additionalMutations,
    queryKeyFilter,
  });
};
