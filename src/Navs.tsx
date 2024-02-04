import { DayScreen, MonthScreen, SettingsScreen } from "@/screens";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDefaultDayId, getDefaultMonthId } from "./utils";

export type RootStackParamList = {
  Month: {
    monthId: string;
  };
  Day: {
    dayId: string;
  };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackNavigation = NavigationProp<RootStackParamList>;

const Navs = () => {
  return (
    <Stack.Navigator
      initialRouteName="Month"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Month"
        component={MonthScreen}
        initialParams={{ monthId: getDefaultMonthId() }}
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        initialParams={{ dayId: getDefaultDayId() }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
          animationDuration: 200,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navs;
