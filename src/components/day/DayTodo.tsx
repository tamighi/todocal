import { Todo } from "@/models";
import { Text } from "@/atoms";

interface Props {
  todo: Todo;
}
const DayTodo: React.FC<Props> = (props) => {
  const { todo } = props;

  return <Text>{todo.title}</Text>;
};

export default DayTodo;
