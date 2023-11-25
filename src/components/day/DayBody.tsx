import React from "react";

import { Box } from "@/atoms";
import { Todo } from "@/models";

import DayTodo from "./DayTodo";

interface Props {
  todos?: Todo[];
}

const DayBody: React.FC<Props> = (props) => {
  const { todos = [] } = props;

  return (
    <Box margin="s" gap="s">
      {todos.map((todo) => (
        <DayTodo key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};

export default DayBody;
