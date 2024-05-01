import { DayScreen, MonthScreen } from "@/screens";
import { NavigationProp } from "@react-navigation/native";
import { getCurrentDayId, getCurrentMonthId } from "./utils";
import { TagListModal } from "./components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Month: {
    monthId: string;
    reset?: boolean;
  };
  Day: {
    dayId: string;
  };
  Settings: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

export type StackNavigation = NavigationProp<RootStackParamList>;

const Navs = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Month"
      screenOptions={{ headerShown: false }}
      drawerContent={TagListModal}
    >
      <Drawer.Screen
        name="Month"
        component={MonthScreen}
        initialParams={{ monthId: getCurrentMonthId() }}
      />
      <Drawer.Screen
        name="Day"
        component={DayScreen}
        initialParams={{ dayId: getCurrentDayId() }}
      />
    </Drawer.Navigator>
  );
};

const NavigationWrapper = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarTranslucent: true }}
    >
      <Stack.Screen name="Main" component={Navs} />
    </Stack.Navigator>
  );
};

export default NavigationWrapper;
