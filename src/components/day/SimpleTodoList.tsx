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

  const simpleRenderItem = (todo: Todo) => {
    return (
      <TodoChip
        key={todo.id}
        minimal
        marginBottom="xs"
        dayId={dayId}
        todo={todo}
      />
    );
  };

  return <Box flex={1}>{todos.map((todo) => simpleRenderItem(todo))}</Box>;
});