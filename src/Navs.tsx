import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Sidebar } from "./components";
import { MainScreen } from "./screens";

export type HomeDrawerParamList = {
  Main: object;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  Detail: {
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