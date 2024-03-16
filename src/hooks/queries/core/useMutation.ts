import React from "react";

import { QueryKey, useMutation as RNuseMutation } from "@tanstack/react-query";

import { OptimisticUpdate, useOptimisticUpdate } from "./useOptimisticUpdate";

type MutationContext<T = any> = {
  mutationKey: QueryKey;
  oldData: T | undefined;
}[];

interface UndoableMutationResult {
  undo?: boolean;
}

export interface MutateOptions<
  Data = any,
  MutationResult = any,
  Params extends any = any,
> {
  onSuccess?: (
    result: MutationResult,
    payload: Params,
    context?: MutationContext<Data>,
  ) => void;
  onMutate?: (payload: Params) => void;
  onError?: (error: Error, payload: Params, context?: MutationContext) => void;
}

interface MutateFns<MainData, ExtraData, MutationResult, Params extends any> {
  mutationFn: (payload: Params) => Promise<MutationResult>;
  optimisticMutationFn: OptimisticUpdate<
    MainData,
    [Params]
  >["optimisticMutationFn"];
  additionalMutations?: OptimisticUpdate<ExtraData, [Params]>[];
}

export const useMutation = <
  MainData,
  ExtraData,
  Params extends any,
  MutationResult extends UndoableMutationResult | object = any,
>(
  queryKey: QueryKey,
  options: MutateOptions<MainData | ExtraData, MutationResult, Params> &
    MutateFns<MainData, ExtraData, MutationResult, Params>,
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
    optimisticMutationFn,
    mutationFn,
    additionalMutations = [],
  } = options;

  const mutationKey = React.useMemo(() => queryKey, []);

  const { mutate, invalidate, undoMutation } = useOptimisticUpdate([
    { mutationKey, optimisticMutationFn },
    ...additionalMutations,
  ]);

  const onMutate = async (payload: Params) => {
    onMutateProp?.(payload);
    return mutate(payload);
  };

  const onSuccess = (
    res: MutationResult,
    payload: Params,
    context?: MutationContext,
  ) => {
    if (res && "undo" in res && res.undo) {
      undoMutation(context);
    } else {
      invalidate();
    }

    onSuccessProp?.(res, payload, context);
  };

  const onError = (
    error: Error,
    payload: Params,
    context?: MutationContext,
  ) => {
    undoMutation(context);
    onErrorProp?.(error, payload, context);
  };

  const mutation = RNuseMutation({
    mutationKey,
    mutationFn,
    onMutate,
    onSuccess,
    onError,
  });

  return mutation;
};
