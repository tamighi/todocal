import React from "react";

import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";

import { Checkbox } from "../Checkbox";

type Props = {
  todo: Todo;
  minimal?: boolean;
} & ChipProps;

const TodoChip: React.FC<Props> = (props) => {
  const { todo, minimal = false, ...rest } = props;

  const [checked, setChecked] = React.useState(todo.done);

  const conditionalChipProps: ChipProps = minimal
    ? ({ variant: "small" } as const)
    : {};

  const conditionalTextProps: TextProps = minimal
    ? ({ variant: "smallChip", numberOfLines: 1 } as const)
    : {};

  const handleCheck = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <Chip
      backgroundColor="chipGreenBackground"
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
