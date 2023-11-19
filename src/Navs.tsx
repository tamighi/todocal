import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Sidebar } from "./components";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: "back",
        swipeEdgeWidth: 200,
      }}
      drawerContent={Sidebar}
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
