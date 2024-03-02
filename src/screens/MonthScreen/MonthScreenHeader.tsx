import { Box, Button } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Feather } from "@expo/vector-icons";

export const MonthScreenHeader = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Box alignSelf="flex-end">
      <Button style={{ margin: 4 }} variant="icon" onPress={openSettings}>
        <Feather name="settings" size={22} />
      </Button>
    </Box>
  );
};
