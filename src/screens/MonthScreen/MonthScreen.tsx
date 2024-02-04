import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Box, Button, Text } from "@/atoms";

import { BaseScreen } from "../BaseScreen";
import { MonthScreenHeader } from "./MonthScreenHeader";
import { MonthCalendar } from "./MonthCalendar";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

export const MonthScreen: React.FC<Props> = ({ route, navigation }) => {
  const { monthId } = route.params;

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  const onNavigate = (monthId: string) => {
    navigation.push("Month", { monthId });
  };

  return (
    <BaseScreen>
      <Box alignSelf="flex-end">
        <Button style={{ margin: 4 }} onPress={openSettings}>
          <Text>Settings</Text>
        </Button>
      </Box>
      <MonthScreenHeader monthId={monthId} onNavigate={onNavigate} />
      <MonthCalendar monthId={monthId} />
    </BaseScreen>
  );
};
