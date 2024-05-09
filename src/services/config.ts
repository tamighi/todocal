import DayService from "./DayService";
import TagService from "./TagService";
import TodoService from "./TodoService";

const dayService = new DayService();
const tagService = new TagService();
const todoService = new TodoService(dayService);

export { todoService, dayService, tagService };

export const serviceMap = {
  todo: todoService,
  day: dayService,
  tag: tagService,
} as const;

export type Resource = keyof typeof serviceMap;

export const resources: Resource[] = Object.keys(serviceMap) as Array<
  keyof typeof serviceMap
>;

export type ResourceType<R extends Resource = Resource> = {
  [K in keyof typeof serviceMap]: Awaited<
    ReturnType<(typeof serviceMap)[K]["getOne"]>
  >;
}[R];
