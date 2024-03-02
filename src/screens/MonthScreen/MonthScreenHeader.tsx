import { Text, Box, Button } from "@/atoms";
import { useNavigation } from "@/hooks";

export const MonthScreenHeader = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Box alignSelf="flex-end">
      <Button style={{ margin: 4 }} onPress={openSettings}>
        <Text>Settings</Text>
      </Button>
    </Box>
  );
};
