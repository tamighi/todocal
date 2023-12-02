import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./themes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Navs from "./Navs";

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <Navs />
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Root;
