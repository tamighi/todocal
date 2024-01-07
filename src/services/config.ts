import DayService from "./DayService";
import MonthService from "./MonthService";
import TagService from "./TagService";
import TodoService from "./TodoService";

const todoService = new TodoService();
const dayService = new DayService();
const monthService = new MonthService();
const tagService = new TagService();

todoService.initialize(dayService, tagService);
dayService.initialize(monthService, todoService);
monthService.initialize(dayService);

export { todoService, dayService, monthService, tagService };

export const serviceMap = {
  todo: todoService,
  day: dayService,
  month: monthService,
  tag: tagService,
} as const;

export type Resource = keyof typeof serviceMap;

export type ResourceTypes = {
  [K in keyof typeof serviceMap]: Awaited<
    ReturnType<(typeof serviceMap)[K]["getOne"]>
  >;
};
