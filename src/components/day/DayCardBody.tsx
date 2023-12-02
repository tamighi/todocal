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
}

const DayCardBody: React.FC<Props> = (props) => {
  const { todos = [], small = false } = props;

  const [todoList, setTodolist] = React.useState(todos);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <Pressable onPressIn={!small ? drag : undefined} disabled={isActive}>
          <TodoChip
            todo={item}
            minimal={small}
            marginBottom={small ? "xxs" : "m"}
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
};

export default DayCardBody;
