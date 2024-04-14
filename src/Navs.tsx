import { DayScreen, MonthScreen, SettingsScreen } from "@/screens";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getCurrentDayId, getCurrentMonthId } from "./utils";
import { useTheme } from "./hooks";
import { Platform } from "react-native";

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
  const { colors } = useTheme();

  const conditionalStyles =
    Platform.OS === "android"
      ? ({
          statusBarColor: colors.mainBackground,
        } as const)
      : {};

  return (
    <Stack.Navigator
      initialRouteName="Day"
      screenOptions={{
        headerShown: false,
        animation: "none",
        ...conditionalStyles,
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
