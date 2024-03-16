import React from "react";

import { QueryKey, useMutation as RNuseMutation } from "@tanstack/react-query";

import { OptimisticUpdate, useOptimisticUpdate } from "./useOptimisticUpdate";

export type MutationContext<TData = any> = {
  mutationKey: QueryKey;
  oldData: TData | undefined;
}[];

interface MutateFns<TData, TVariable> {
  mutationFn: (payload: TVariable) => Promise<any>;
  optimisticMutationFn: OptimisticUpdate<
    TData,
    TVariable
  >["optimisticMutationFn"];
  additionalMutations?: OptimisticUpdate<TData, TVariable>[];
}

export interface MutateOptions<
  TData = any,
  TVariable = any,
  TMutationResult = any,
> {
  onMutate?: (payload: TVariable) => void;
  onSuccess?: (
    result: TMutationResult,
    payload: TVariable,
    context?: MutationContext<TData>,
  ) => void;
  onError?: (
    error: Error,
    payload: TVariable,
    context?: MutationContext,
  ) => void;
}

export const useMutation = <TMainData, TExtraData, TVariable, TMutationResult>(
  queryKey: QueryKey,
  options: MutateOptions<TMainData | TExtraData, TVariable, TMutationResult> &
    MutateFns<TMainData, TVariable>,
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

  const { mutate, invalidate } = useOptimisticUpdate([
    { mutationKey, optimisticMutationFn },
    ...additionalMutations,
  ]);

  const onMutate = async (payload: TVariable) => {
    onMutateProp?.(payload);
    return mutate(payload);
  };

  const onSuccess = (
    result: TMutationResult,
    payload: TVariable,
    context?: MutationContext,
  ) => {
    onSuccessProp?.(result, payload, context);
    invalidate();
  };

  const onError = (
    error: Error,
    payload: TVariable,
    context?: MutationContext,
  ) => {
    onErrorProp?.(error, payload, context);
    invalidate();
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
