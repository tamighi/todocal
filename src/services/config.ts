import DayService from "./DayService";
import MonthService from "./MonthService";
import TodoService from "./TodoService";

const todoService = new TodoService();
const dayService = new DayService();
const monthService = new MonthService();

todoService.initialize(dayService);
dayService.initialize(monthService, todoService);
monthService.initialize(dayService);

export { todoService, dayService, monthService };

export const serviceMap = {
  todo: todoService,
  day: dayService,
  month: monthService,
} as const;

export type Resource = keyof typeof serviceMap;

export type ResourceTypes = {
  [K in keyof typeof serviceMap]: Awaited<
    ReturnType<(typeof serviceMap)[K]["getOne"]>
  >;
};
