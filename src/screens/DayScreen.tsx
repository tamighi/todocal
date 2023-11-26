import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Container, Text } from "@/atoms";
import { DayComponent } from "@/components";
import { useDay, useNavigation } from "@/hooks";
import { getDefaultDayId } from "@/utils";
import { Pressable } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId = getDefaultDayId() } = route.params;

  const { day } = useDay(dayId);

  const navigation = useNavigation();

  return (
    <Container margin="xl">
      <Pressable onPress={() => navigation.navigate("Month")}>
        <Text>Go back</Text>
      </Pressable>
      {day ? <DayComponent day={day} /> : <Text>Loading ...</Text>}
    </Container>
  );
};

export default DayScreen;
