import React from "react";

import { useTodos } from "@/hooks";
import { Card } from "@/atoms";

import DayBody from "./DayBody";
import DayHeader from "./DayHeader";

interface Props {
  day?: Date;
}

const DayComponent: React.FC<Props> = (props) => {
  const { day = new Date() } = props;

  const { todos } = useTodos();

  return (
    <Card variant="primary" height="100%" overflow="hidden">
      <DayHeader day={day} />
      <DayBody todos={todos} />
    </Card>
  );
};

export default DayComponent;
