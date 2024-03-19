import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";

import { DatabaseLoader } from "./database";
import { theme } from "./themes";
import {
  ClickOutsideProvider,
  QueryClientProvider,
  TagModalProvider,
  TodoFilterProvider,
  TodoModalProvider,
  UndoToastProvider,
} from "./providers";

import Navs from "./Navs";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider>
            <DatabaseLoader>
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
            </DatabaseLoader>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Root;
