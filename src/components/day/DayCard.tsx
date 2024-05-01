import React from "react";

import { Card, CardProps } from "@/atoms";
import { useGetList } from "@/hooks";
import { useTodoFilters } from "@/contexts";
import { filterTodos } from "@/utils";

import { DayCardHeader } from "./DayCardHeader";
import { SimpleTodoList } from "./SimpleTodoList";
import { DraggableTodoList } from "./DraggableTodoList";

type Props = {
  dayId: string;
  small?: boolean;
} & CardProps;

export const DayCard: React.FC<Props> = (props) => {
  const { dayId, small = false, ...rest } = props;

  const { data: todos } = useGetList("todo", {
    where: { day: { id: dayId } },
  });

  const { filters } = useTodoFilters();

  const date = React.useMemo(() => new Date(dayId), [dayId]);

  return (
    <Card borderRadius="s" flex={1} padding="xxs" {...rest}>
      <DayCardHeader dayOnly={small} day={date} />
      {small ? (
        <SimpleTodoList dayId={dayId} todos={filterTodos(todos, filters)} />
      ) : (
        <DraggableTodoList dayId={dayId} todos={filterTodos(todos, filters)} />
      )}
    </Card>
  );
};
