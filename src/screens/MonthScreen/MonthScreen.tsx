import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Text } from "@/atoms";
import { useGetOne } from "@/hooks";

import { BaseScreen } from "../BaseScreen";
import { MonthHeader } from "./MonthHeader";
import { MonthCalendar } from "./MonthCalendar";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

export const MonthScreen: React.FC<Props> = ({ route }) => {
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
