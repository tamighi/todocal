import React from "react";

import { Card, CardProps } from "@/atoms";
import { Day } from "@/models";

import { DayCardHeader } from "./DayCardHeader";
import { SimpleTodoList } from "./SimpleTodoList";
import { DraggableTodoList } from "./DraggableTodoList";

type Props = {
  day: Day;
  small?: boolean;
} & CardProps;

export const DayCard: React.FC<Props> = (props) => {
  const { day, small = false, ...rest } = props;

  const todos = React.useMemo(() => day.todos, [day.todos]);

  const date = new Date(day.id);

  return (
    <Card
      borderRadius="s"
      variant="primary"
      flex={1}
      padding={!small ? "xs" : "xxs"}
      {...rest}
    >
      <DayCardHeader dayOnly={small} day={date} />
      {small ? (
        <SimpleTodoList dayId={day.id} todos={todos} />
      ) : (
        <DraggableTodoList dayId={day.id} todos={todos} />
      )}
    </Card>
  );
};
