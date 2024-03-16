import { QueryKey, useQueryClient } from "@tanstack/react-query";

export interface OptimisticUpdate<TData = any, TVariable = unknown> {
  mutationKey: QueryKey;
  optimisticMutationFn: (
    data: TData,
    payload: TVariable,
    queryKey: QueryKey,
  ) => TData;
}

export const useOptimisticUpdate = <TVariable>(
  optimisticUpdates: OptimisticUpdate<any, TVariable>[],
) => {
  const queryClient = useQueryClient();

  const mutate = async (payload: TVariable) => {
    const mutations = optimisticUpdates.map(async (update) => {
      const { mutationKey, optimisticMutationFn: mutationFn } = update;

      await queryClient.cancelQueries({ queryKey: mutationKey });

      const queriesData = queryClient.getQueriesData({ queryKey: mutationKey });

      queriesData.forEach((queryData) => {
        const [queryKey, oldData] = queryData;
        queryClient.setQueryData(queryKey, () =>
          mutationFn(oldData, payload, queryKey),
        );
      });

      return { mutationKey, oldData: queriesData };
    });

    return Promise.all(mutations);
  };

  const invalidate = () => {
    optimisticUpdates.forEach((update) => {
      const { mutationKey } = update;
      if (!(queryClient.isMutating({ mutationKey }) > 1)) {
        queryClient.invalidateQueries({ queryKey: mutationKey });
      }
    });
  };

  return { mutate, invalidate };
};
