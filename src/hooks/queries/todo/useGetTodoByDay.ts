import { useQuery } from "@tanstack/react-query";

import { todoService } from "@/services";

export const useGetTodoByDay = (dayId: string) => {
  const queryResult = useQuery({
    queryKey: ["todo", "list", dayId],
    queryFn: () => todoService.getByDay(dayId),
  });

  return queryResult;
};
