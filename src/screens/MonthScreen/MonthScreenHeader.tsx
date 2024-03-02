import { Box, Button } from "@/atoms";
import { useNavigation } from "@/hooks";
import { getCurrentDayId } from "@/utils";
import { Feather } from "@expo/vector-icons";

export const MonthScreenHeader = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToday = () => {
    navigation.navigate("Day", { dayId: getCurrentDayId() });
  };

  return (
    <Box flexDirection="row" justifyContent="flex-end">
      <Button style={{ margin: 4 }} variant="icon" onPress={navigateToday}>
        <Feather name="home" size={22} />
      </Button>
      <Button style={{ margin: 4 }} variant="icon" onPress={openSettings}>
        <Feather name="settings" size={22} />
      </Button>
    </Box>
  );
};
