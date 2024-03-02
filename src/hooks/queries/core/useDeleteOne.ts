import { useMutation } from "@tanstack/react-query";

import { useUndoToast } from "@/providers/UndoToastProvider";
import { Resource, serviceMap } from "@/services";

interface DeleteOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
) => {
  const { onSuccess: onSuccessProp, onError } = options;
  const { show } = useUndoToast();

  const onSuccess = () => {
    show({ message: "Item deleted" });
    onSuccessProp?.();
  };

  const mutation = useMutation({
    mutationFn: (id: string) => serviceMap[resource].delete(id),
    onSuccess,
    onError,
  });

  return mutation;
};
