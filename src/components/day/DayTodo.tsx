import { Todo } from "@/models";
import { Chip, Text } from "@/atoms";

interface Props {
  todo: Todo;
  minimal?: boolean;
}

const DayTodo: React.FC<Props> = (props) => {
  const { todo, minimal = false } = props;

  const conditionalChipProps = minimal ? ({ variant: "small" } as const) : {};

  const conditionalTextProps = minimal
    ? ({ variant: "small", numberOfLines: 1 } as const)
    : {};

  return (
    <Chip
      backgroundColor="$greenChip"
      flexDirection="row"
      justifyContent="space-between"
      {...conditionalChipProps}
    >
      <Text {...conditionalTextProps}>{todo.content}</Text>
      {!minimal && <Text>{todo.done ? "Done" : "Not done"}</Text>}
    </Chip>
  );
};

export default DayTodo;
