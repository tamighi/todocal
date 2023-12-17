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
