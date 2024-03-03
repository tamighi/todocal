import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useOptimisticUpdate = (mutationKey: QueryKey) => {
  const queryClient = useQueryClient();

  const onMutate = async <TData>(
    optimisticMutationFn: (data: TData | undefined) => TData,
  ) => {
    await queryClient.cancelQueries({ queryKey: mutationKey });

    const oldListContext = queryClient.getQueriesData<TData>({
      queryKey: mutationKey,
    });

    queryClient.setQueriesData<TData>({ queryKey: mutationKey }, (oldData) => {
      return optimisticMutationFn(oldData);
    });

    return oldListContext;
  };

  const onSuccess = () => {
    if (
      // Only invalidate if there are no other mutations.
      !(queryClient.isMutating({ mutationKey }) > 1)
    ) {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    }
  };

  const onError = (_: Error, __: string, context?: [QueryKey, any][]) => {
    if (context) {
      context.forEach((query) => {
        const [queryKey, oldData] = query;
        queryClient.setQueriesData({ queryKey }, oldData);
      });
    }
  };

  return { onMutate, onSuccess, onError };
};
