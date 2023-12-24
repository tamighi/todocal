import React from "react";

import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Pressable } from "react-native";

import { Todo } from "@/models";

import TodoChip from "./TodoChip";
import { useMutateTodo } from "@/hooks";

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
          delayLongPress={50}
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
  const { mutate } = useMutateTodo(dayId);

  const setNewOrder = (todos: Todo[], to: number) => {
    if (todos.length === 1) return;

    let prevOrder: number;
    // Put at the beginning, no prev items.
    if (to === 0) {
      prevOrder = 0;
    } else {
      prevOrder = todos[to - 1].order;
    }

    let nextOrder: number;
    // Put in last, no next items.
    if (to === todos.length - 1) {
      nextOrder = todos[to - 1].order + 1;
    } else {
      nextOrder = todos[to + 1].order;
    }

    const newOrder = (nextOrder - prevOrder) / 2 + prevOrder;
    mutate({ ...todos[to], order: newOrder });
  };

  const onDragEnd = React.useCallback((params: DragEndParams<Todo>) => {
    const { data, to } = params;

    setTodolist(data);

    setNewOrder(data, to);
  }, []);

  return (
    <DraggableFlatList
      data={todoList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={onDragEnd}
    />
  );
});

DayCardBody.displayName = "DayCardBody";

export default DayCardBody;
