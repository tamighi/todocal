import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Text } from "@/atoms";
import { MonthCalendar, MonthHeader } from "@/components";
import { useGetOne } from "@/hooks";
import { BaseScreen } from "./BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

const MonthScreen: React.FC<Props> = ({ route }) => {
  const { monthId } = route.params;

  const { data: month } = useGetOne("month", monthId);

  return (
    <BaseScreen>
      {month ? (
        <>
          <MonthHeader month={month} />
          <MonthCalendar month={month} />
        </>
      ) : (
        <Text>Loading ...</Text>
      )}
    </BaseScreen>
  );
};

export default MonthScreen;
