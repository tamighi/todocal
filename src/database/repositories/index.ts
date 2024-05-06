import DayRepository from "./day.repository";
import RepetitionRepository from "./repetition.repository";
import TagRepository from "./tag.repository";
import TodoRepository from "./todo.repository";

const todoRepository = new TodoRepository();
const dayRepository = new DayRepository();
const tagRepository = new TagRepository();
const repetitionRepository = new RepetitionRepository();

export {
  todoRepository,
  TodoRepository,
  dayRepository,
  DayRepository,
  tagRepository,
  TagRepository,
  repetitionRepository,
  RepetitionRepository,
};

export * from "./abstract.repository";
