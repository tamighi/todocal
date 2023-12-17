import React from "react";

import { Todo } from "@/models";
import { todoService } from "@/services";

const useTodos = (dayId: string) => {
  const [todos, setTodos] = React.useState<Todo[]>();

  React.useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getList({
        where: { day: { id: dayId } },
      });
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  return { todos };
};

export default useTodos;
