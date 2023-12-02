import React from "react";

import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";

import { Checkbox } from "../Checkbox";

interface Props {
  todo: Todo;
  minimal?: boolean;
}

const DayTodo: React.FC<Props> = (props) => {
  const { todo, minimal = false } = props;
  const [checked, setChecked] = React.useState(todo.done);

  const conditionalChipProps: ChipProps = minimal
    ? ({ variant: "small" } as const)
    : {};

  const conditionalTextProps: TextProps = minimal
    ? ({ variant: "smallChip", numberOfLines: 1 } as const)
    : {};

  const handleCheck = (newState: boolean) => {
    setChecked(newState);
  };

  return (
    <Chip
      backgroundColor="chipGreenBackground"
      flexDirection="row"
      justifyContent="space-between"
      gap="xs"
      {...conditionalChipProps}
    >
      <Text {...conditionalTextProps}>{todo.content}</Text>
      {!minimal && (
        <Checkbox margin="xs" onPress={handleCheck} checked={checked} />
      )}
    </Chip>
  );
};

export default DayTodo;
