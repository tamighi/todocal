import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";

import { theme } from "./themes";
import {
  ClickOutsideProvider,
  DatabaseProvider,
  QueryClientProvider,
  TodoFilterProvider,
} from "./providers";

import Navs from "./Navs";

const Root = () => {
  StatusBar.setBarStyle("light-content");

  return (
    <ClickOutsideProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider>
              <DatabaseProvider>
                <TodoFilterProvider>
                  <Navs />
                </TodoFilterProvider>
              </DatabaseProvider>
            </QueryClientProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </ThemeProvider>
    </ClickOutsideProvider>
  );
};

export default Root;
