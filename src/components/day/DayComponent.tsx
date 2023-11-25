import React from "react";

import { Container } from "@/atoms";
import { Todos } from "@/models";
import { TodoService } from "@/services";

import DayBody from "./DayBody";
import DayHeader from "./DayHeader";

interface Props {
  day?: string;
}

const DayComponent: React.FC<Props> = (props) => {
  const { day = new Date().toLocaleDateString() } = props;
  const [todos, setTodos] = React.useState<Todos[]>();

  React.useEffect(() => {
    const fetchTodos = async () => {
      const todos = await TodoService.getList();
      setTodos(todos);
    };

    fetchTodos();
  });

  return (
    <Container>
      <DayHeader day={day} />
      <DayBody todos={todos} />
    </Container>
  );
};

export default DayComponent;
