import { createDrawerNavigator } from "@react-navigation/drawer";

import { Sidebar } from "@/components";
import { DayScreen, MonthScreen } from "@/screens";
import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  Month?: {
    monthId?: string;
  };
  Day: {
    dayId?: string;
  };
};

const Drawer = createDrawerNavigator<RootStackParamList>();

export type StackNavigation = NavigationProp<RootStackParamList>;

const Navs = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Month"
      screenOptions={{
        drawerType: "back",
        swipeEdgeWidth: 200,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen
        name="Month"
        component={MonthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Day"
        component={DayScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default Navs;
