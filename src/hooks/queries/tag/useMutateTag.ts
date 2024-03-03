import { useQueryClient } from "@tanstack/react-query";

import { useMutate } from "../core";
import { useDeleteOne } from "../core";

type MutateTagOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useMutateTag = (options: MutateTagOptions = {}) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const queryClient = useQueryClient();

  const onMutateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["todo"] });
    onSuccessProp?.();
  };

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["todo"] });
  };

  const { mutate } = useMutate("tag", { onSuccess: onMutateSuccess, onError });

  const { mutate: deleteMutate } = useDeleteOne("tag", {
    onSuccess: ({ undo }) => !undo && onDeleteSuccess(),
    onMutate: onSuccessProp,
    onError,
  });

  return { mutate, deleteMutate };
};
