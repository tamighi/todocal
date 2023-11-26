import React from "react";

import { Todo } from "@/models";
import { TodoService } from "@/services";

const useTodos = (dayId?: string) => {
  const [todos, setTodos] = React.useState<Todo[]>();

  React.useEffect(() => {
    const fetchTodos = async () => {
      const todos = await TodoService.getList({ dayId });
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  return { todos };
};

export default useTodos;
