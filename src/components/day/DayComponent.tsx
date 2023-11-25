import React from "react";

import { Box, Container, Text } from "@/atoms";
import { Todos } from "@/models";
import { TodoService } from "@/services";

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
      <Box margin="s">
        <Text>{day}</Text>
      </Box>
      <Box margin="s" gap="s">
        {todos?.map((note) => <Text key={note.id}>{note.title}</Text>)}
      </Box>
    </Container>
  );
};

export default DayComponent;
