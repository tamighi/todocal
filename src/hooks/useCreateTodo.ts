import { Todo } from "@/models";
import { todoService } from "@/services";

export const useCreateTodo = () => {
  const mutate = async (dayId: string, todo: Pick<Todo, "content">) => {
    return todoService.create({ day: { id: dayId }, ...todo });
  };

  return { mutate };
};
