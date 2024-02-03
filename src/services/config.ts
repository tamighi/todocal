import DayService from "./DayService";
import TagService from "./TagService";
import TodoService from "./TodoService";

const todoService = new TodoService();
const dayService = new DayService();
const tagService = new TagService();

todoService.initialize(dayService, tagService);
dayService.initialize(todoService);

export { todoService, dayService, tagService };

export const serviceMap = {
  todo: todoService,
  day: dayService,
  tag: tagService,
} as const;

export type Resource = keyof typeof serviceMap;

export type ResourceTypes = {
  [K in keyof typeof serviceMap]: Awaited<
    ReturnType<(typeof serviceMap)[K]["getOne"]>
  >;
};
