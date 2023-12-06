import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaView } from "react-native";

import { theme } from "./themes";
import Navs from "./Navs";

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Navs />
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Root;
