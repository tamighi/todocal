import { Todo } from "@/models";
import { useUpdate } from "../core/useUpdate";
import { QueryKey } from "@tanstack/react-query";

export interface UpdateOptions {
  onSuccess?: (result: Todo) => void;
  onMutate?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateTodo = (options: UpdateOptions = {}) => {
  const { onMutate, onSuccess, onError } = options;

  const baseOptimisticMutationFn = (
    oldData: Todo[],
    newData: Partial<Todo>,
  ) => {
    return oldData
      .map((data) => {
        if (data.id === newData.id) {
          return { ...data, ...newData };
        }
        return data;
      })
      .sort((l, r) => l.order - r.order);
  };

  const dayOptimisticMutationFn = (
    oldData: Todo[],
    newData: Partial<Todo>,
    queryKey: QueryKey,
  ) => {
    //@ts-ignore ...
    const currentDayId = queryKey[2]?.where?.day?.id;
    if (!currentDayId) return oldData;

    const todoIndex = oldData.findIndex((todo) => todo.id === newData.id);

    if (todoIndex === -1 && currentDayId === newData.day?.id) {
      oldData.push(newData as Todo);
    } else if (todoIndex !== -1 && currentDayId !== newData.day?.id) {
      oldData.splice(todoIndex, 1);
    }
    return oldData;
  };

  const optimisticMutationFn = (
    oldData: Todo[] = [],
    newData: Partial<Todo>,
    queryKey: QueryKey,
  ) => {
    const firstMutation = baseOptimisticMutationFn(oldData, newData);
    const dayMutation = dayOptimisticMutationFn(
      firstMutation,
      newData,
      queryKey,
    );
    return dayMutation;
  };

  return useUpdate("todo", {
    onMutate,
    onSuccess,
    onError,
    optimisticMutationFn,
  });
};
