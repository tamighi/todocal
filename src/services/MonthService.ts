import { monthApi } from "@/mockApi";
import { Month } from "@/models";

const MonthService = {
  getOne: async (id: string): Promise<Month> => {
    let month = monthApi.getOne(id);
    if (!month) {
      month = {
        id,
        days: [],
      };
    }

    return month;
  },
};

export default MonthService;
