import { QueryKey, useQueryClient } from "@tanstack/react-query";

export interface OptimisticUpdate<TData = any, TVariable = unknown> {
  mutationKey: QueryKey;
  optimisticMutationFn: (data: TData, payload: TVariable) => TData;
}

export const useOptimisticUpdate = <TVariable>(
  optimisticUpdates: OptimisticUpdate<any, TVariable>[],
) => {
  const queryClient = useQueryClient();

  const mutate = async (payload: TVariable) => {
    const mutations = optimisticUpdates.map(async (update) => {
      const { mutationKey, optimisticMutationFn: mutationFn } = update;

      await queryClient.cancelQueries({ queryKey: mutationKey });

      const oldData = queryClient.getQueryData(mutationKey);

      const updatedData = mutationFn(oldData, payload);

      queryClient.setQueryData(mutationKey, updatedData);

      return { mutationKey, oldData };
    });

    return Promise.all(mutations);
  };

  const invalidate = () => {
    optimisticUpdates.forEach((update) =>
      queryClient.invalidateQueries({ queryKey: update.mutationKey }),
    );
  };

  return { mutate, invalidate };
};
