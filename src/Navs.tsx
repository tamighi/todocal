import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DayScreen, MonthScreen, SettingsModal, TagListModal } from "@/screens";
import { getCurrentDayId, getCurrentMonthId } from "@/utils";

export type RootStackParamList = {
  Month: {
    monthId: string;
    reset?: boolean;
  };
  Day: {
    dayId: string;
  };
  Settings: undefined;
  TagList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackNavigation = NavigationProp<RootStackParamList>;

const Navs = () => {
  return (
    <Stack.Navigator
      initialRouteName="Month"
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen
        name="Month"
        component={MonthScreen}
        initialParams={{ monthId: getCurrentMonthId() }}
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        initialParams={{ dayId: getCurrentDayId() }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsModal}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="TagList"
        component={TagListModal}
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default Navs;
