import { Todo } from "@/models";
import { Chip, Text } from "@/atoms";

interface Props {
  todo: Todo;
}

const DayTodo: React.FC<Props> = (props) => {
  const { todo } = props;

  return (
    <Chip variant="green" flexDirection="row" justifyContent="space-between">
      <Text>{todo.content}</Text>
      <Text>{todo.done ? "Done" : "Not done"}</Text>
    </Chip>
  );
};

export default DayTodo;
