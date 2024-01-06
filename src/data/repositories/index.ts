import DayRepository from "./day.repository";
import MonthRepository from "./month.repository";
import TagRepository from "./tag.repository";
import TodoRepository from "./todo.repository";

const todoRepository = new TodoRepository();
const dayRepository = new DayRepository();
const monthRepository = new MonthRepository();
const tagRepository = new TagRepository();

export { todoRepository, dayRepository, monthRepository, tagRepository };
