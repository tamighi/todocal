import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Sidebar } from "@/components";
import { DayScreen, MonthScreen } from "@/screens";

export type HomeDrawerParamList = {
  Month: object;
  Day: object;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
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

const Navs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navs;
