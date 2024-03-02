import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";

import { BaseScreen } from "../BaseScreen";
import { MonthScreenNavigation } from "./MonthScreenNavigation";
import { MonthCalendar } from "./MonthCalendar";
import { MonthScreenHeader } from "./MonthScreenHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

export const MonthScreen: React.FC<Props> = ({ route, navigation }) => {
  const { monthId } = route.params;

  const onNavigate = (monthId: string) => {
    navigation.push("Month", { monthId });
  };

  return (
    <BaseScreen>
      <MonthScreenHeader />
      <MonthScreenNavigation monthId={monthId} onNavigate={onNavigate} />
      <MonthCalendar monthId={monthId} />
    </BaseScreen>
  );
};
