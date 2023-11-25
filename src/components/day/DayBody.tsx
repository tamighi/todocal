import React from "react";

import { Box, Text } from "@/atoms";
import { Todos } from "@/models";

interface Props {
  todos?: Todos[];
}

const DayBody: React.FC<Props> = (props) => {
  const { todos = [] } = props;

  return (
    <Box margin="s" gap="s">
      {todos.map((note) => (
        <Text key={note.id}>{note.title}</Text>
      ))}
    </Box>
  );
};

export default DayBody;
