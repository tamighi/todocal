import { TODO_FIXTURES } from "@/fixtures";
import { Todo } from "@/models";

const TodoApi = {
  getList(filter?: Partial<Todo>) {
    return TODO_FIXTURES.filter(
      (todo) => !filter?.dayId || filter.dayId === todo.dayId,
    );
  },
};

export default TodoApi;
