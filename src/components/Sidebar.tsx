import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box } from "../atoms";
import { SafeAreaView } from "react-native";
import { Link } from "@react-navigation/native";

const Sidebar: React.FC<DrawerContentComponentProps> = () => {
  return (
    <Box flex={1} bg="$sidebarBackground">
      <SafeAreaView>
        <Link to={{ screen: "Main" }}>Main</Link>
        <Link to={{ screen: "Day" }}>Day</Link>
      </SafeAreaView>
    </Box>
  );
};

export default Sidebar;
