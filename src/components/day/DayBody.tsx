import React from "react";

import { Box } from "@/atoms";
import { Todo } from "@/models";

import DayTodo from "./DayTodo";

interface Props {
  todos?: Todo[];
  small?: boolean;
}

const DayBody: React.FC<Props> = (props) => {
  const { todos = [], small = false } = props;

  return (
    <Box margin={small ? "none" : "s"} gap="s" flex={1}>
      {todos.map((todo) => (
        <DayTodo key={todo.id} todo={todo} minimal={small} />
      ))}
    </Box>
  );
};

export default DayBody;
