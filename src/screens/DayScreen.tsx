import React from "react";
import { Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Container, Text } from "@/atoms";
import { MutateTodoBottomSheet, DayCard } from "@/components";
import { useGetOne, useNavigation } from "@/hooks";
import { getMonthIdFromDayId } from "@/utils";
import { Todo } from "@/models";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = React.useState<Todo | null>(null);

  const { data: day } = useGetOne("day", dayId);

  const navigation = useNavigation();

  const handleTodoPress = (todo: Todo) => {
    setOpen(true);
    setTodo(todo);
  };

  return (
    <Container margin="xl">
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Text>Go back</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setOpen(true);
          setTodo(null);
        }}
      >
        <Text>Create</Text>
      </Pressable>
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
          console.log("close");
        }}
        todo={todo}
      />
    </Container>
  );
};

export default DayScreen;
