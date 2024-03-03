import { useMutate } from "../core";
import { useDeleteOne } from "../core";
import { useQueryClient } from "@tanstack/react-query";

type MutateTodoOptions = {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

export const useMutateTodo = (_: string, options: MutateTodoOptions = {}) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const queryClient = useQueryClient();

  const onMutateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["day"] });

    onSuccessProp?.();
  };

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["day"] });
  };

  const { mutate } = useMutate("todo", { onSuccess: onMutateSuccess, onError });

  const { mutate: deleteMutate } = useDeleteOne("todo", {
    onSuccess: onDeleteSuccess,
    onMutate: onSuccessProp,
    onError,
  });

  return { mutate, deleteMutate };
};
