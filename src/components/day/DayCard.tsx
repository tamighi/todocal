import React from "react";

import { Card, CardProps } from "@/atoms";
import { Day, Todo } from "@/models";

import DayCardBody from "./DayCardBody";
import DayCardHeader from "./DayCardHeader";

type Props = {
  day: Day;
  small?: boolean;
  onTodoPress?: (todo: Todo) => void;
} & CardProps;

const DayCard: React.FC<Props> = (props) => {
  const { day, small = false, onTodoPress, ...rest } = props;

  const todos = React.useMemo(() => day.todos, [day]);

  const date = new Date(day.id);

  return (
    <Card variant="primary" height="100%" overflow="hidden" {...rest}>
      <DayCardHeader dayOnly={small} day={date} />
      <DayCardBody
        dayId={day.id}
        small={small}
        todos={todos}
        onTodoPress={onTodoPress}
      />
    </Card>
  );
};

export default DayCard;
