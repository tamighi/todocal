import React from "react";

import { QueryKey, useMutation } from "@tanstack/react-query";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useOptimisticUpdate } from "./useOptimisticUpdate";
import { UndoMutationResult, useUndoMutation } from "./useUndoMutation";

interface MutateContext<R extends Resource, T extends any> {
  internal?: [QueryKey, ResourceTypes[R][] | undefined][];
  custom?: T;
}

interface DeleteOptions<R extends Resource, T extends any> {
  onSuccess?: (
    res: UndoMutationResult,
    id: string,
    context?: MutateContext<R, T>["custom"],
  ) => void;
  onMutate?: (id: string) => Promise<T> | T;
  onError?: (
    error: Error,
    id: string,
    context?: MutateContext<R, T>["custom"],
  ) => void;
}

export const useDeleteOne = <R extends Resource, T extends any>(
  resource: R,
  options: DeleteOptions<R, T> = {},
) => {
  const {
    onMutate: onMutateProp,
    onSuccess: onSuccessProp,
    onError: onErrorProp,
  } = options;

  const mutationKey = React.useMemo(() => [resource, "list"], []);

  const { mutate, invalidate, undoMutation } = useOptimisticUpdate(mutationKey);

  const { mutationFn, showUndoToast } = useUndoMutation((id: string) =>
    serviceMap[resource].delete(id),
  );
  const onMutate = async (id: string) => {
    showUndoToast("Item deleted");

    const customContext = await onMutateProp?.(id);

    const internalContext = await mutate(
      (oldData: ResourceTypes[R][] = []) =>
        oldData?.filter((data) => data.id !== id),
    );

    return { custom: customContext, internal: internalContext };
  };

  const onSuccess = (
    { undo }: UndoMutationResult,
    _: string,
    context?: MutateContext<R, T>,
  ) => {
    if (undo) {
      undoMutation(context?.internal);
    } else {
      invalidate();
    }

    onSuccessProp?.({ undo }, _, context?.custom);
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
