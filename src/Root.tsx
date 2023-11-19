import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import Navs from "./Navs";
import { theme } from "./themes";

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
