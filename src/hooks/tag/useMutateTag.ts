import { useMutate } from "@/hooks/useMutate";
import { useDeleteOne } from "@/hooks/useDeleteOne";
import { useQueryClient } from "@tanstack/react-query";

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
    queryClient.invalidateQueries({
      queryKey: ["month"],
    });

    onSuccessProp?.();
  };

  const { mutate } = useMutate("tag", { onSuccess, onError });

  const { mutate: deleteMutate } = useDeleteOne("tag", { onSuccess, onError });

  return { mutate, deleteMutate };
};
