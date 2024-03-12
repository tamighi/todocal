import DayRepository from "./day.repository";
import TagRepository from "./tag.repository";
import TodoRepository from "./todo.repository";

const todoRepository = new TodoRepository();
const dayRepository = new DayRepository();
const tagRepository = new TagRepository();

export {
  todoRepository,
  TodoRepository,
  dayRepository,
  DayRepository,
  tagRepository,
  TagRepository,
};

export * from "./abstract.repository";
