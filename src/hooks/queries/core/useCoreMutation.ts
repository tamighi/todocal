import React from "react";

import { QueryKey, useMutation } from "@tanstack/react-query";

import { Resource, ResourceTypes } from "@/services";
import { useOptimisticUpdate } from "./useOptimisticUpdate";

interface MutateContext<R extends Resource, T extends any> {
  internal?: [QueryKey, ResourceTypes[R][] | undefined][];
  custom?: T;
}

interface UndoableMutationResult {
  undo?: boolean;
}

export interface MutateOptions<
  R extends Resource,
  T extends any,
  Res extends UndoableMutationResult | undefined = UndoableMutationResult,
> {
  onSuccess?: (
    res: Res,
    id: string,
    context?: MutateContext<R, T>["custom"],
  ) => void;
  onMutate?: (id: string) => Promise<T | undefined> | T | undefined;
  onError?: (
    error: Error,
    id: string,
    context?: MutateContext<R, T>["custom"],
  ) => void;
}

interface MutateFns<R extends Resource> {
  optimisticMutationFn: (
    id: string,
    oldData?: ResourceTypes[R][],
  ) => ResourceTypes[R][] | undefined;
  mutationFn: (id: string) => Promise<any>;
}

export const useCoreMutation = <
  R extends Resource,
  T extends any,
  Res extends UndoableMutationResult | undefined,
>(
  resource: R,
  options: MutateOptions<R, T, Res> & MutateFns<R>,
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
    optimisticMutationFn,
    mutationFn,
  } = options;

  const mutationKey = React.useMemo(() => [resource, "list"], []);

  const { mutate, invalidate, undoMutation } = useOptimisticUpdate(mutationKey);

  const onMutate = async (id: string) => {
    const customContext = await onMutateProp?.(id);

    const internalContext = await mutate<ResourceTypes[R][]>((oldData) =>
      optimisticMutationFn(id, oldData),
    );

    return { custom: customContext, internal: internalContext };
  };

  const onSuccess = (res: Res, _: string, context?: MutateContext<R, T>) => {
    if (res?.undo) {
      undoMutation(context?.internal);
    } else {
      invalidate();
    }

    onSuccessProp?.(res, _, context?.custom);
  };

  const onError = (error: Error, _: string, context?: MutateContext<R, T>) => {
    undoMutation(context?.internal);
    onErrorProp?.(error, _, context?.custom);
  };

  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onMutate,
    onSuccess,
    onError,
  });

  return mutation;
};
