import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./themes";
import {
  ClickOutsideProvider,
  DatabaseProvider,
  QueryClientProvider,
  TagModalProvider,
  TodoFilterProvider,
  TodoModalProvider,
  UndoToastProvider,
} from "./providers";

import Navs from "./Navs";

const Root = () => {
  StatusBar.setBarStyle("light-content");

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider>
              <DatabaseProvider>
                <ClickOutsideProvider>
                  <TodoFilterProvider>
                    <UndoToastProvider>
                      <TodoModalProvider>
                        <TagModalProvider>
                          <Navs />
                        </TagModalProvider>
                      </TodoModalProvider>
                    </UndoToastProvider>
                  </TodoFilterProvider>
                </ClickOutsideProvider>
              </DatabaseProvider>
            </QueryClientProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default Root;
