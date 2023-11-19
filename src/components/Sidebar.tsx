import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box, Text } from "../atoms";
import { SafeAreaView } from "react-native";

const Sidebar: React.FC<DrawerContentComponentProps> = () => {
  return (
    <Box flex={1} bg="$sidebarBackground">
      <SafeAreaView>
        <Text variant="sidebar" m="lg">
          Hello App
        </Text>
      </SafeAreaView>
    </Box>
  );
};

export default Sidebar;
