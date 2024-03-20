import React from "react";

import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Pressable, View } from "react-native";

import { Todo } from "@/models";
import { TodoChip } from "@/components/todos";
import { useTodoModal } from "@/contexts";
import { useUpdateTodo } from "@/hooks";

interface Props {
  todos?: Todo[];
  dayId: string;
}

export const DraggableTodoList: React.FC<Props> = React.memo((props) => {
  const { todos = [], dayId } = props;

  const [todoList, setTodolist] = React.useState(todos);
  const { setTodoModalProps } = useTodoModal();

  React.useEffect(() => {
    setTodolist(todos);
  }, [todos]);

  const handleTodoPress = (todo: Todo) => {
    setTodoModalProps({ todo, open: true, dayId });
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <Pressable
          delayLongPress={100}
          onLongPress={drag}
          onPress={() => handleTodoPress(item)}
          disabled={isActive}
        >
          <TodoChip
            todo={item}
            minimal={false}
            marginBottom="s"
            dayId={dayId}
          />
        </Pressable>
      </ScaleDecorator>
    );
  };

  const { mutate } = useUpdateTodo();

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
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onDragEnd={onDragEnd}
      />
    </View>
  );
});
