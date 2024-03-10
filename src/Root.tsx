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
import { PortalProvider } from "@gorhom/portal";

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider>
          <PortalProvider>
            <ThemeProvider theme={theme}>
              <ClickOutsideProvider>
                <TodoFilterProvider>
                  <UndoToastProvider>
                    <DatabaseLoader>
                      <TodoModalProvider>
                        <TagModalProvider>
                          <Navs />
                        </TagModalProvider>
                      </TodoModalProvider>
                    </DatabaseLoader>
                  </UndoToastProvider>
                </TodoFilterProvider>
              </ClickOutsideProvider>
            </ThemeProvider>
          </PortalProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Root;
