import { Resource, serviceMap } from "@/services";
import { useMutation } from "@tanstack/react-query";

interface DeleteOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteOne = <R extends Resource>(
  resource: R,
  options: DeleteOptions = {},
) => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: (id: string) => serviceMap[resource].delete(id),
    onSuccess,
    onError,
  });

  return mutation;
};
