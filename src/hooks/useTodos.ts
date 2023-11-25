import React from "react";

import { Todo } from "@/models";
import { TodoService } from "@/services";

const useTodos = () => {
  const [todos, setTodos] = React.useState<Todo[]>();

  React.useEffect(() => {
    const fetchTodos = async () => {
      const todos = await TodoService.getList();
      setTodos(todos);
    };

    fetchTodos();
  });

  return { todos };
};

export default useTodos;
