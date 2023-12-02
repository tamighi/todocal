import React from "react";

import { Card } from "@/atoms";
import { dayIdToDate } from "@/utils";
import { Day } from "@/models";

import DayCardBody from "./DayCardBody";
import DayCardHeader from "./DayCardHeader";

interface Props {
  day: Day;
  small?: boolean;
}

const DayCard: React.FC<Props> = (props) => {
  const { day, small = false } = props;

  const todos = day.todos;

  const date = dayIdToDate(day.id);

  return (
    <Card variant="primary" height="100%" overflow="hidden">
      <DayCardHeader dayOnly={small} day={date} />
      <DayCardBody small={small} todos={todos} />
    </Card>
  );
};

export default DayCard;
