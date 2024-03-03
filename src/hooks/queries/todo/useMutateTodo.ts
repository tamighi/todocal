import { useMutate } from "../core";
import { useDeleteOne } from "../core";

type MutateTodoOptions = {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

export const useMutateTodo = (_: string, options: MutateTodoOptions = {}) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const { mutate } = useMutate("todo", { onSuccess: onSuccessProp, onError });

  const { mutate: deleteMutate } = useDeleteOne("todo", {
    onMutate: onSuccessProp,
    onError,
  });

  return { mutate, deleteMutate };
};
