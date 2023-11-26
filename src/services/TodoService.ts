import { todoApi } from "@/mockApi";
import { Todo } from "@/models";

const TodoService = {
  getList: async (filter: Partial<Todo> = {}) => {
    return todoApi.getList(filter);
  },
};

export default TodoService;
