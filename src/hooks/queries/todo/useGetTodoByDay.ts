import { useQuery } from "@tanstack/react-query";

import { todoService } from "@/services";
import { Todo } from "@/models";

export const useGetTodoByDay = (dayId: string) => {
  const queryResult = useQuery<Todo[]>({
    queryKey: ["todo", "list", dayId],
    queryFn: () => todoService.getByDay(dayId),
  });

  return queryResult;
};
