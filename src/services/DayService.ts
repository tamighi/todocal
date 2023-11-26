import { dayApi } from "@/mockApi";
import { Day } from "@/models";

const DayService = {
  getOne: async (id: string): Promise<Day> => {
    let day = dayApi.getOne(id);
    if (!day) {
      day = {
        id,
        todos: [],
      };
    }

    return day;
  },
};

export default DayService;
