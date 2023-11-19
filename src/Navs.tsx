import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens";

const Stack = createNativeStackNavigator();

const Navs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default Navs;
