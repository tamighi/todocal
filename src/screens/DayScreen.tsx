import React from "react";
import { Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Container, Text } from "@/atoms";
import { CreateTodoBottomSheet, DayCard } from "@/components";
import { useGetOne, useNavigation } from "@/hooks";
import { getMonthIdFromDayId } from "@/utils";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const [open, setOpen] = React.useState(false);

  const { data: day } = useGetOne("day", dayId);

  const navigation = useNavigation();

  return (
    <Container margin="xl">
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Text>Go back</Text>
      </Pressable>
      <Pressable onPress={() => setOpen(true)}>
        <Text>Create</Text>
      </Pressable>
      {day ? <DayCard day={day} /> : <Text>Loading ...</Text>}
      <CreateTodoBottomSheet dayId={dayId} open={open} />
    </Container>
  );
};

export default DayScreen;
