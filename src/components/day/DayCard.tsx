import React from "react";

import { Card, CardProps } from "@/atoms";
import { useGetList } from "@/hooks";
import { useTodoFilters } from "@/contexts";

import { DayCardHeader } from "./DayCardHeader";
import { SimpleTodoList } from "./SimpleTodoList";
import { DraggableTodoList } from "./DraggableTodoList";
import { filterTodos } from "@/utils";

type Props = {
  dayId: string;
  small?: boolean;
} & CardProps;

export const DayCard: React.FC<Props> = (props) => {
  const { dayId, small = false, ...rest } = props;

  const { data: todos = [] } = useGetList("todo", {
    where: { day: { id: dayId } },
  });
  const { filters } = useTodoFilters();

  const date = new Date(dayId);

  return (
    <Card borderRadius="s" variant="primary" flex={1} padding="xxs" {...rest}>
      <DayCardHeader dayOnly={small} day={date} />
      {small ? (
        <SimpleTodoList
          dayId={dayId}
          todos={filterTodos(todos, "month", filters)}
        />
      ) : (
        <DraggableTodoList
          dayId={dayId}
          todos={filterTodos(todos, "day", filters)}
        />
      )}
    </Card>
  );
};
