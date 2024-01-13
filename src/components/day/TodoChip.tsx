import React from "react";

import { Todo } from "@/models";
import { Box, Chip, ChipProps, Text, TextProps } from "@/atoms";
import { useMutateTodo, useTheme } from "@/hooks";

import { Checkbox } from "../Checkbox";
import { TodoChipInfos } from "./TodoChipInfos";

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
      paddingVertical="none"
      paddingHorizontal="none"
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
      <Box position="relative">
        <TodoChipInfos
          todo={todo}
          containerStyle={
            minimal
              ? { position: "absolute", top: -2, right: 0, gap: 0 }
              : { alignSelf: "flex-end" }
          }
          iconSize={minimal ? 10 : 16}
        />
        {!minimal && (
          <Checkbox
            margin="xs"
            alignSelf="flex-end"
            onPress={handleCheck}
            checked={checked}
          />
        )}
      </Box>
    </Chip>
  );
};

export default TodoChip;
