import { Resource, serviceMap } from "@/services";
import { useMutation } from "@tanstack/react-query";

type ServiceMutateFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["mutate"];
};

interface CreateOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useMutate = <R extends Resource>(
  resource: R,
  options: CreateOptions = {},
) => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    //@ts-expect-error TS can't infer return types properly
    mutationFn: (p: Parameters<ServiceMutateFns[R]>[0]) =>
      serviceMap[resource].mutate(p),
    onSuccess,
    onError,
  });

  return mutation;
};
