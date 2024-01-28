import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DatabaseLoader } from "./database";
import { theme } from "./themes";
import {
  ClickOutsideProvider,
  TagModalProvider,
  TodoModalProvider,
} from "./contexts";

import Navs from "./Navs";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ClickOutsideProvider>
              <TodoModalProvider>
                <TagModalProvider>
                  <DatabaseLoader>
                    <Navs />
                  </DatabaseLoader>
                </TagModalProvider>
              </TodoModalProvider>
            </ClickOutsideProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Root;
