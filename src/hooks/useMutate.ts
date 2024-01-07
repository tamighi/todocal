import { Resource, serviceMap } from "@/services";
import { useMutation } from "@tanstack/react-query";

type ServiceMutateFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["mutate"];
};

interface CreateOptions<R extends Resource> {
  onSuccess?: (data: Awaited<ReturnType<ServiceMutateFns[R]>>) => void;
  onError?: (error: unknown) => void;
}

export const useMutate = <R extends Resource>(
  resource: R,
  options: CreateOptions<R> = {},
) => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: (p: Parameters<ServiceMutateFns[R]>[0]) =>
      serviceMap[resource].mutate(p),
    onSuccess,
    onError,
  });

  return mutation;
};
