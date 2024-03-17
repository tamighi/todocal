import React from "react";

import { useUndoToast } from "@/providers/UndoToastProvider";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

export type UndoMutationResult = {
  undo: boolean;
};

type UndoMutationContext = [QueryKey, unknown];

const UNDO_DURATION = 5000;

export const useUndoMutation = <Fn extends (...p: any[]) => Promise<void>>(
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
        }, UNDO_DURATION);
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
    show({ message, undoCallback: onUndo, duration: UNDO_DURATION });
  };

  const onUndoableMutationSuccess = (
    result: UndoMutationResult,
    contexts?: UndoMutationContext[],
  ) => {
    if (!result.undo) return;
    contexts?.forEach((context) => {
      const [mutationKey, oldData] = context;
      queryClient.setQueryData(mutationKey, oldData);
    });
  };

  return { showUndoToast, mutationFn, onUndoableMutationSuccess };
};
