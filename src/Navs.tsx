import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Sidebar } from "./components";
import { DayScreen, MainScreen } from "./screens";

export type HomeDrawerParamList = {
  Main: object;
  Day: object;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  Day: {
    day: string;
  };
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: "back",
        swipeEdgeWidth: 200,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={MainScreen}
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
