import { Query, QueryKey, useQueryClient } from "@tanstack/react-query";

export type OptimisticMutationContext<TData = any> = {
  mutationKey: QueryKey;
  contexts: [QueryKey, TData][];
}[];

export interface OptimisticUpdate<TData = any, TVariable = any> {
  mutationKey: QueryKey;
  optimisticMutationFn: (
    data: TData,
    payload: TVariable,
    queryKey: QueryKey,
  ) => TData;
}

export interface OptimisticMutateOptions<TVariable = any> {
  queryKeyFilter?: (query: Query, payload: TVariable) => boolean;
}

export const useOptimisticUpdate = <TVariable>(
  optimisticUpdates: OptimisticUpdate<any, TVariable>[],
  options: OptimisticMutateOptions = {},
) => {
  const queryClient = useQueryClient();
  const { queryKeyFilter = () => true } = options;

  const mutate = async (
    payload: TVariable,
  ): Promise<OptimisticMutationContext> => {
    const mutations = optimisticUpdates.map(async (update) => {
      const { mutationKey, optimisticMutationFn: mutationFn } = update;

      await queryClient.cancelQueries({ queryKey: mutationKey });

      const queriesData = queryClient.getQueriesData({
        queryKey: mutationKey,
        predicate: (query) => queryKeyFilter(query, payload),
      });

      queriesData.forEach((queryData) => {
        const [queryKey, oldData] = queryData;

        queryClient.setQueryData(queryKey, () =>
          mutationFn(oldData, payload, queryKey),
        );
      });

      return { mutationKey, contexts: queriesData };
    });

    return Promise.all(mutations);
  };

  const invalidate = (payload: TVariable) => {
    optimisticUpdates.forEach((update) => {
      const { mutationKey } = update;
      if (queryClient.isMutating({ mutationKey }) > 1) return;

      queryClient.invalidateQueries({
        queryKey: mutationKey,
        predicate: (query) => queryKeyFilter(query, payload),
      });
    });
  };

  return { mutate, invalidate };
};
