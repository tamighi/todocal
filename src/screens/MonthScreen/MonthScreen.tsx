import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Box, Button, Text } from "@/atoms";
import { useNavigation } from "@/hooks";

import { BaseScreen } from "../BaseScreen";
import { MonthHeader } from "./MonthHeader";
import { MonthCalendar } from "./MonthCalendar";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

export const MonthScreen: React.FC<Props> = ({ route }) => {
  const { monthId } = route.params;
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <BaseScreen>
      <Box alignSelf="flex-end">
        <Button style={{ margin: 4 }} onPress={openSettings}>
          <Text>Settings</Text>
        </Button>
      </Box>
      <MonthHeader monthId={monthId} />
      <MonthCalendar month={month} />
    </BaseScreen>
  );
};
