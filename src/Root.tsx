import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DatabaseLoader } from "./data/DatabaseLoader";
import { theme } from "./themes";
import Navs from "./Navs";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <DatabaseLoader>
              <Navs />
            </DatabaseLoader>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Root;
