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
    <Stack.Navigator initialRouteName="Month">
      <Stack.Screen
        name="Month"
        component={MonthScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ monthId: getDefaultMonthId() }}
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ dayId: getDefaultDayId() }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navs;
