import React from "react";

import { useUndoToast } from "@/providers/UndoToastProvider";

export const useUndoMutation = <Fn extends (...p: any) => Promise<any>>(
  undoableMutationFn: Fn,
) => {
  const { show } = useUndoToast();
  const undoRef = React.useRef<() => void>();
  const onUndo = React.useCallback(() => undoRef.current?.(), [undoRef]);

  const mutationFn = (...params: Parameters<Fn>) => {
    const mutationPromise = new Promise<{ undo: boolean }>(
      (resolve, reject) => {
        const timeout = setTimeout(() => {
          undoableMutationFn(params)
            .then(() => resolve({ undo: false }))
            .catch((err) => reject(err));
        }, 5000);
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

  return { showUndoToast, mutationFn };
};
