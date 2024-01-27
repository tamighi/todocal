import React from "react";

import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Checkbox } from "@/components/core";
import { TodoChipColorInfoBox } from "./TodoChipColorInfoBox";

type Props = {
  todo: Todo;
  dayId: string;
  minimal?: boolean;
} & ChipProps;

export const TodoChip: React.FC<Props> = (props) => {
  const { todo, minimal = false, dayId, ...rest } = props;

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
      backgroundColor="mainBackground"
      alignItems="center"
      gap="xs"
      style={{
        opacity: todo.done ? 0.4 : 1,
      }}
      {...rest}
    >
      <TodoChipColorInfoBox
        color={todo.tag?.color}
        urgent={todo.urgent}
        important={todo.important}
        width={minimal ? 5 : 8}
      />

      <Text style={{ flex: 1 }} {...conditionalTextProps}>
        {todo.content}
      </Text>
      {!minimal && (
        <Checkbox
          margin="xs"
          alignSelf="flex-end"
          onPress={handleCheck}
          checked={checked}
        />
      )}
    </Chip>
  );
};
