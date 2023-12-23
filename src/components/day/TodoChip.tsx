import React from "react";

import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";

import { Checkbox } from "../Checkbox";
import { useMutate } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getMonthIdFromDayId } from "@/utils";

type Props = {
  todo: Todo;
  dayId: string;
  minimal?: boolean;
} & ChipProps;

const TodoChip: React.FC<Props> = (props) => {
  const { todo, minimal = false, dayId, ...rest } = props;

  const [checked, setChecked] = React.useState(todo.done);

  const conditionalChipProps: ChipProps = minimal
    ? ({ variant: "small" } as const)
    : {};

  const conditionalTextProps: TextProps = minimal
    ? ({ variant: "smallChip", numberOfLines: 1 } as const)
    : {};

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["day", dayId] });
    queryClient.invalidateQueries({
      queryKey: ["month", getMonthIdFromDayId(dayId)],
    });
  };

  const { mutate } = useMutate("todo", { onSuccess });

  const handleCheck = (checked: boolean) => {
    mutate({ id: todo.id, done: checked });
    setChecked(checked);
  };

  return (
    <Chip
      backgroundColor={todo.done ? "chipDoneBackground" : "chipGreenBackground"}
      flexDirection="row"
      justifyContent="space-between"
      gap="xs"
      {...conditionalChipProps}
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
