import React from "react";

import { useTodos } from "@/hooks";
import { Container } from "@/atoms";

import DayBody from "./DayBody";
import DayHeader from "./DayHeader";

interface Props {
  day?: string;
}

const DayComponent: React.FC<Props> = (props) => {
  const { day = new Date().toLocaleDateString() } = props;

  const { todos } = useTodos();

  return (
    <Container>
      <DayHeader day={day} />
      <DayBody todos={todos} />
    </Container>
  );
};

export default DayComponent;
