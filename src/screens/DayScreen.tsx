import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Text } from "@/atoms";
import { MutateTodoBottomSheet, DayCard, DayHeader } from "@/components";
import { useGetOne } from "@/hooks";
import { Todo } from "@/models";

import { BaseScreen } from "./BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = React.useState<Todo | null>(null);

  const { data: day } = useGetOne("day", dayId);

  const handleTodoPress = React.useCallback((todo: Todo) => {
    setOpen(true);
    setTodo(todo);
  }, []);

  const handleCreatePress = () => {
    setOpen(true);
    setTodo(null);
  };

  return (
    <BaseScreen marginHorizontal="xl">
      <DayHeader onCreatePress={handleCreatePress} dayId={dayId} />
      {day ? (
        <DayCard day={day} onTodoPress={handleTodoPress} />
      ) : (
        <Text>Loading ...</Text>
      )}
      <MutateTodoBottomSheet
        dayId={dayId}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        todo={todo}
      />
    </BaseScreen>
  );
};

export default DayScreen;
