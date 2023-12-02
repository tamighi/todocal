import { Todo } from "@/models";
import { Chip, ChipProps, Text, TextProps } from "@/atoms";

interface Props {
  todo: Todo;
  minimal?: boolean;
}

const DayTodo: React.FC<Props> = (props) => {
  const { todo, minimal = false } = props;

  const conditionalChipProps: ChipProps = minimal
    ? ({ variant: "small" } as const)
    : {};

  const conditionalTextProps: TextProps = minimal
    ? ({ variant: "smallChip", numberOfLines: 1 } as const)
    : {};

  return (
    <Chip
      backgroundColor="chipGreenBackground"
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
