import React from "react";

import { useUndoToast } from "@/providers/UndoToastProvider";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

export type UndoMutationResult = {
  undo: boolean;
};

export const useUndoMutation = <Fn extends (...p: any) => Promise<any>>(
  undoableMutationFn: Fn,
) => {
  const { show } = useUndoToast();
  const queryClient = useQueryClient();

  const undoRef = React.useRef<() => void>();
  const onUndo = React.useCallback(() => undoRef.current?.(), [undoRef]);

  const mutationFn = (...params: Parameters<Fn>) => {
    const mutationPromise = new Promise<UndoMutationResult>(
      (resolve, reject) => {
        const timeout = setTimeout(() => {
          undoableMutationFn(params)
            .then(() => resolve({ undo: false }))
            .catch((err) => reject(err));
        }, 6000);
        const cancelMutation = () => {
          clearTimeout(timeout);
          resolve({ undo: true });
        };
        undoRef.current = cancelMutation;
      },
    );

    return mutationPromise;
  };

  const showUndoToast = (message: string) => {
    show({ message, callback: onUndo });
  };

  const onUndoableMutationSuccess = (
    result: UndoMutationResult,
    _: unknown,
    context?: { mutationKey: QueryKey; oldData?: [QueryKey, unknown][] }[],
  ) => {
    if (!context || !result.undo) return;

    context.forEach((mutation) => {
      const { oldData } = mutation;
      oldData?.forEach((ctx) => {
        const [mutationKey, oldData] = ctx;
        queryClient.setQueryData(mutationKey, oldData);
      });
    });
  };

  return { showUndoToast, mutationFn, onUndoableMutationSuccess };
};
