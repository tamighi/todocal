import React from "react";

import { useTodos } from "@/hooks";
import { Card } from "@/atoms";

import DayBody from "./DayBody";
import DayHeader from "./DayHeader";

interface Props {
  day?: string;
}

const DayComponent: React.FC<Props> = (props) => {
  const { day = new Date().toLocaleDateString() } = props;

  const { todos } = useTodos();

  return (
    <Card variant="primary">
      <DayHeader day={day} />
      <DayBody todos={todos} />
    </Card>
  );
};

export default DayComponent;
