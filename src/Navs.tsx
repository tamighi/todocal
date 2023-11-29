import { DayScreen, MonthScreen } from "@/screens";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Month?: {
    monthId?: string;
  };
  Day: {
    dayId?: string;
  };
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
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navs;
