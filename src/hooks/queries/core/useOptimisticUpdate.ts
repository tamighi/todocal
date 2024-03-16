import { QueryKey, useQueryClient } from "@tanstack/react-query";

export interface OptimisticUpdate<TData = any, P extends any[] = any> {
  mutationKey: QueryKey;
  optimisticMutationFn: (
    data: TData | undefined,
    ...params: P
  ) => TData | undefined;
}

export const useOptimisticUpdate = <P extends Array<any>>(
  optimisticUpdates: OptimisticUpdate<any, P>[],
) => {
  const queryClient = useQueryClient();

  const mutate = async (...params: P) => {
    const mutations = optimisticUpdates.map(async (update) => {
      const { mutationKey, optimisticMutationFn: mutationFn } = update;

      // Cancel any existing queries for this mutation key
      await queryClient.cancelQueries({ queryKey: mutationKey });

      // Retrieve the current data for this specific query key
      const oldData = queryClient.getQueryData<any>(mutationKey);

      const updatedData = mutationFn(oldData, ...params); // Apply update function if present

      // Update query data with the optimistic change
      queryClient.setQueryData(mutationKey, updatedData);

      return { mutationKey, oldData }; // Return mutation key and original data for undo
    });

    // Return the data and mutation keys for potential undo operations
    return Promise.all(mutations);
  };

  const invalidate = () => {
    optimisticUpdates.forEach((update) =>
      queryClient.invalidateQueries({ queryKey: update.mutationKey }),
    );
  };

  const undoMutation = (
    mutations?: { mutationKey: QueryKey; oldData?: unknown }[],
  ) => {
    if (mutations) {
      // Restore the original data for each mutation key
      mutations.forEach((mutation) => {
        queryClient.setQueryData(mutation.mutationKey, mutation.oldData);
      });
    }
  };

  return { mutate, invalidate, undoMutation };
};
