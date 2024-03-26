import React from "react";

import { Todo } from "@/models";
import { TodoChip } from "@/components/todos";
import { Box } from "@/atoms";

interface Props {
  todos?: Todo[];
  dayId: string;
}

export const SimpleTodoList: React.FC<Props> = React.memo((props) => {
  const { todos = [], dayId } = props;

  const simpleRenderItem = (todo: Todo, index: number) => {
    return (
      <TodoChip
        key={index}
        minimal
        marginBottom="xxs"
        dayId={dayId}
        todo={todo}
      />
    );
  };

  return (
    <Box overflow="scroll" flex={1}>
      {todos.map((todo, index) => simpleRenderItem(todo, index))}
    </Box>
  );
});
