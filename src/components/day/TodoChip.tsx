import React from "react";

import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";
import { useMutateTodo, useTheme } from "@/hooks";

import { Checkbox } from "../Checkbox";

type Props = {
  todo: Todo;
  dayId: string;
  minimal?: boolean;
} & ChipProps;

const TodoChip: React.FC<Props> = (props) => {
  const { todo, minimal = false, dayId, ...rest } = props;
  const theme = useTheme();

  const [checked, setChecked] = React.useState(todo.done);

  const conditionalTextProps: TextProps = minimal
    ? ({ variant: "smallChip", numberOfLines: 1 } as const)
    : {};

  const { mutate } = useMutateTodo(dayId);

  const handleCheck = (checked: boolean) => {
    mutate({ id: todo.id, done: checked });
    setChecked(checked);
  };

  return (
    <Chip
      flexDirection="row"
      justifyContent="space-between"
      gap="xs"
      style={{
        backgroundColor: todo.done
          ? theme.colors.chipDoneBackground
          : todo.tag?.color
            ? todo.tag.color
            : theme.colors.chipDefaultBackground,
      }}
      {...rest}
    >
      <Text style={{ flex: 1 }} {...conditionalTextProps}>
        {todo.content}
      </Text>
      {!minimal && (
        <Checkbox margin="xs" onPress={handleCheck} checked={checked} />
      )}
    </Chip>
  );
};

export default TodoChip;
