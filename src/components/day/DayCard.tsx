import React from "react";

import { Card, CardProps } from "@/atoms";
import { Day } from "@/models";

import DraggableTodoList from "./DraggableTodoList";
import DayCardHeader from "./DayHeader";

type Props = {
  day: Day;
  small?: boolean;
} & CardProps;

export const DayCard: React.FC<Props> = (props) => {
  const { day, small = false, ...rest } = props;

  const todos = React.useMemo(() => day.todos, [day]);

  const date = new Date(day.id);

  return (
    <Card
      borderRadius="s"
      variant="primary"
      flex={1}
      overflow="scroll"
      padding={!small ? "xs" : "xxs"}
      {...rest}
    >
      <DayCardHeader dayOnly={small} day={date} />
      <DraggableTodoList dayId={day.id} small={small} todos={todos} />
    </Card>
  );
};
