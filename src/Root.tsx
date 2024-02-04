import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";

import { DatabaseLoader } from "./database";
import { theme } from "./themes";
import {
  ClickOutsideProvider,
  QueryClientProvider,
  TagModalProvider,
  TodoModalProvider,
} from "./contexts";

import Navs from "./Navs";

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider>
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
