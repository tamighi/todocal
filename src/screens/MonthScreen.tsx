import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Container, Text } from "@/atoms";
import { MonthCalendar, MonthHeader } from "@/components";
import { useMonth } from "@/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

const MonthScreen: React.FC<Props> = ({ route }) => {
  const { monthId } = route.params;

  const { month } = useMonth(monthId);

  return (
    <Container justifyContent="center" alignItems="center">
      {month ? (
        <>
          <MonthHeader month={month} />
          <MonthCalendar month={month} />
        </>
      ) : (
        <Text>Loading ...</Text>
      )}
    </Container>
  );
};

export default MonthScreen;
