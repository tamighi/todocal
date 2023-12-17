import DayRepository from "./day.repository";
import MonthRepository from "./month.repository";
import TodoRepository from "./todo.repository";

const todoRepository = new TodoRepository();
const dayRepository = new DayRepository();
const monthRepository = new MonthRepository();

export { todoRepository, dayRepository, monthRepository };
