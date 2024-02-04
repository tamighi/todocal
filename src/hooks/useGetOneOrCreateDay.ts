import { dayService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetOneOrCreateDay = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["day", id],
    queryFn: () => dayService.getOneOrCreate(id),
  });

  return queryResult;
};
