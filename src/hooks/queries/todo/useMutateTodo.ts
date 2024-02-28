import { useMutate } from "@/hooks/queries/useMutate";
import { useDeleteOne } from "@/hooks/queries/useDeleteOne";
import { useQueryClient } from "@tanstack/react-query";

type MutateTodoOptions = {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

export const useMutateTodo = (
  dayId: string,
  options: MutateTodoOptions = {},
) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["day", "detail", dayId] });
    queryClient.invalidateQueries({ queryKey: ["day", "list"] });

    onSuccessProp?.();
  };

  const { mutate } = useMutate("todo", { onSuccess, onError });

  const { mutate: deleteMutate } = useDeleteOne("todo", { onSuccess, onError });

  return { mutate, deleteMutate };
};
