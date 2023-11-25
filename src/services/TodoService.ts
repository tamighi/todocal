import { TODO_FIXTURES } from "@/fixtures";

const TodoService = {
  getList: async () => {
    return TODO_FIXTURES;
  },
};

export default TodoService;
