import React from "react";

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Pressable } from "react-native";

import { Todo } from "@/models";

import TodoChip from "./TodoChip";

interface Props {
  todos?: Todo[];
  small?: boolean;
  dayId: string;
  onTodoPress?: (todo: Todo) => void;
}

const DayCardBody: React.FC<Props> = React.memo((props) => {
  const { todos = [], small = false, dayId, onTodoPress } = props;

  const [todoList, setTodolist] = React.useState(todos);

  React.useEffect(() => {
    setTodolist(todos);
  }, [todos]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <Pressable
          onPressIn={drag}
          onPress={() => onTodoPress?.(item)}
          disabled={isActive}
        >
          <TodoChip
            todo={item}
            minimal={small}
            marginBottom={small ? "xxs" : "m"}
            dayId={dayId}
          />
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={todoList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={({ data }) => setTodolist(data)}
    />
  );
});

DayCardBody.displayName = "DayCardBody";

export default DayCardBody;
