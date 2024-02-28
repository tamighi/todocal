import { useQueryClient } from "@tanstack/react-query";

import { useMutate } from "../useMutate";
import { useDeleteOne } from "../useDeleteOne";

type MutateTagOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useMutateTag = (options: MutateTagOptions = {}) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["tag"] });
    queryClient.invalidateQueries({ queryKey: ["day"] });

    onSuccessProp?.();
  };

  const { mutate } = useMutate("tag", { onSuccess, onError });

  const { mutate: deleteMutate } = useDeleteOne("tag", { onSuccess, onError });

  return { mutate, deleteMutate };
};
