import { DAY_FIXTURES } from "@/fixtures";
import { Day } from "@/models";

const DayApi = {
  getOne(id: string): Day | undefined {
    return DAY_FIXTURES.find((day) => id === day.id);
  },
};

export default DayApi;
