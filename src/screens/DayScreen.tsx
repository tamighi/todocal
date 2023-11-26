import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Container, Text } from "@/atoms";
import { DayComponent } from "@/components";
import { useDay } from "@/hooks";
import { getDefaultDayId } from "@/utils";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId = getDefaultDayId() } = route.params;

  const { day } = useDay(dayId);

  return (
    <Container margin="xl">
      {day ? <DayComponent day={day} /> : <Text>Loading ...</Text>}
    </Container>
  );
};

export default DayScreen;
