import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useOptimisticUpdate = (mutationKey: QueryKey) => {
  const queryClient = useQueryClient();

  const mutate = async <TData>(
    optimisticMutationFn: (data: TData | undefined) => TData | undefined,
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

  const invalidate = () => {
    if (
      // Only invalidate if there are no other mutations.
      !(queryClient.isMutating({ mutationKey }) > 1)
    ) {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    }
  };

  const undoMutation = (context: [QueryKey, any][] = []) => {
    context.forEach((query) => {
      const [queryKey, oldData] = query;
      queryClient.setQueriesData({ queryKey }, oldData);
    });
  };

  return { mutate, invalidate, undoMutation };
};
