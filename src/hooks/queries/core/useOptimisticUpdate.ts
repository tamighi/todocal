import { QueryKey, useQueryClient } from "@tanstack/react-query";

export type MutationContext<TData = any> = {
  mutationKey: QueryKey;
  oldData: TData;
};

export interface OptimisticUpdate<TData = any, TVariable = unknown> {
  mutationKey: QueryKey;
  optimisticMutationFn: (
    data: TData,
    payload: TVariable,
    queryKey: QueryKey,
  ) => TData;
}

export interface OptimisticMutateOptions<TVariable = any> {
  queryKeyFilter?: (queryKey: QueryKey, payload: TVariable) => boolean;
}

export const useOptimisticUpdate = <TVariable>(
  optimisticUpdates: OptimisticUpdate<any, TVariable>[],
  options: OptimisticMutateOptions = {},
) => {
  const queryClient = useQueryClient();
  const { queryKeyFilter = () => true } = options;

  const mutate = async (payload: TVariable): Promise<MutationContext[]> => {
    const mutations = optimisticUpdates.map(async (update) => {
      const { mutationKey, optimisticMutationFn: mutationFn } = update;

      await queryClient.cancelQueries({ queryKey: mutationKey });

      const queriesData = queryClient.getQueriesData({ queryKey: mutationKey });

      queriesData.forEach((queryData) => {
        const [queryKey, oldData] = queryData;

        if (queryKeyFilter(queryKey, payload) === false) return;

        queryClient.setQueryData(queryKey, () =>
          mutationFn(oldData, payload, queryKey),
        );
      });

      return { mutationKey, oldData: queriesData };
    });

    return Promise.all(mutations);
  };

  const invalidate = (payload: TVariable) => {
    optimisticUpdates.forEach((update) => {
      const { mutationKey } = update;
      if (queryClient.isMutating({ mutationKey }) > 1) return;

      const queriesData = queryClient.getQueriesData({ queryKey: mutationKey });

      queriesData.forEach((queryData) => {
        const [queryKey] = queryData;
        if (queryKeyFilter(queryKey, payload) === false) return;

        queryClient.invalidateQueries({ queryKey });
      });
    });
  };

  return { mutate, invalidate };
};
