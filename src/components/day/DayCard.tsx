import React from "react";

import { Card, CardProps } from "@/atoms";
import { Todo } from "@/models";

import { DayCardHeader } from "./DayCardHeader";
import { SimpleTodoList } from "./SimpleTodoList";
import { DraggableTodoList } from "./DraggableTodoList";
import { filterTodos } from "@/utils";
import { useTodoFilters } from "@/contexts";

type Props = {
  dayId: string;
  todos?: Todo[];
  small?: boolean;
} & CardProps;

export const DayCard: React.FC<Props> = (props) => {
  const { dayId, todos = [], small = false, ...rest } = props;

  const { filters } = useTodoFilters();

  const date = new Date(dayId);
  const filteredTodos = filterTodos(todos, filters);

  return (
    <Card borderRadius="s" variant="primary" flex={1} padding="xxs" {...rest}>
      <DayCardHeader dayOnly={small} day={date} />
      {small ? (
        <SimpleTodoList dayId={dayId} todos={filteredTodos} />
      ) : (
        <DraggableTodoList dayId={dayId} todos={filteredTodos} />
      )}
    </Card>
  );
};
