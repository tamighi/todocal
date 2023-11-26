import { MONTH_FIXTURES } from "@/fixtures";
import { Month } from "@/models";

const MonthApi = {
  getOne(id: string): Month | undefined {
    return MONTH_FIXTURES.find((month) => id === month.id);
  },
};

export default MonthApi;
