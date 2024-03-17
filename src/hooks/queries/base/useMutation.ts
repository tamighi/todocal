import React from "react";

import { QueryKey, useMutation as RNuseMutation } from "@tanstack/react-query";

import {
  OptimisticMutationContext,
  OptimisticMutateOptions,
  OptimisticUpdate,
  useOptimisticUpdate,
} from "./useOptimisticUpdate";

export interface MutateFns<TData, TVariable, TMutationResult = TData> {
  mutationFn: (payload: TVariable) => Promise<TMutationResult>;
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
    context?: OptimisticMutationContext<TData>,
  ) => void;
  onError?: (
    error: Error,
    payload: TVariable,
    context?: OptimisticMutationContext,
  ) => void;
}

export const useMutation = <TMainData, TExtraData, TVariable, TMutationResult>(
  queryKey: QueryKey,
  options: MutateOptions<TMainData | TExtraData, TVariable, TMutationResult> &
    MutateFns<TMainData, TVariable, TMutationResult> &
    OptimisticMutateOptions,
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
    optimisticMutationFn,
    mutationFn,
    additionalMutations = [],
    queryKeyFilter,
  } = options;

  const mutationKey = React.useMemo(() => queryKey, []);

  const { mutate, invalidate } = useOptimisticUpdate(
    [{ mutationKey, optimisticMutationFn }, ...additionalMutations],
    { queryKeyFilter },
  );

  const onMutate = async (payload: TVariable) => {
    onMutateProp?.(payload);
    return mutate(payload);
  };

  const onSuccess = (
    result: TMutationResult,
    payload: TVariable,
    context?: OptimisticMutationContext,
  ) => {
    onSuccessProp?.(result, payload, context);
    invalidate(payload);
  };

  const onError = (
    error: Error,
    payload: TVariable,
    context?: OptimisticMutationContext,
  ) => {
    onErrorProp?.(error, payload, context);
    invalidate(payload);
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
