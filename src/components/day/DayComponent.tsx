import React from "react";

import { Card } from "@/atoms";
import { dayIdToDate } from "@/utils";
import { Day } from "@/models";

import DayBody from "./DayBody";
import DayHeader from "./DayHeader";

interface Props {
  day: Day;
  small?: boolean;
}

const DayComponent: React.FC<Props> = (props) => {
  const { day, small = false } = props;

  const todos = day.todos;

  const date = dayIdToDate(day.id);

  return (
    <Card variant="primary" height="100%" overflow="hidden">
      <DayHeader dayOnly={small} day={date} />
      <DayBody small={small} todos={todos} />
    </Card>
  );
};

export default DayComponent;
