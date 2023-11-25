import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./themes";

import Navs from "./Navs";

const Root = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Navs />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default Root;
