import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";

import { BaseScreen } from "../BaseScreen";
import { MonthScreenNavigation } from "./MonthScreenNavigation";
import { MonthCalendar } from "./MonthCalendar";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

export const MonthScreen: React.FC<Props> = ({ route, navigation }) => {
  const { monthId } = route.params;

  const onNavigate = (monthId: string) => {
    navigation.replace("Month", { monthId });
  };

  return (
    <BaseScreen>
      <MonthScreenNavigation monthId={monthId} onNavigate={onNavigate} />
      <MonthCalendar monthId={monthId} />
    </BaseScreen>
  );
};
