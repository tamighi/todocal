import React from "react";

import { Box, BoxProps } from "@/atoms";
import { Todo } from "@/models";

import DayTodo from "./DayTodo";

interface Props {
  todos?: Todo[];
  small?: boolean;
}

const DayBody: React.FC<Props> = (props) => {
  const { todos = [], small = false } = props;

  const containerProps: BoxProps = small
    ? { gap: "xxs", marginHorizontal: "xxs" }
    : { margin: "s", gap: "s" };

  return (
    <Box {...containerProps} flex={1}>
      {todos.map((todo) => (
        <DayTodo key={todo.id} todo={todo} minimal={small} />
      ))}
    </Box>
  );
};

export default DayBody;
