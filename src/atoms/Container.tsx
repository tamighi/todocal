import { Theme } from "../themes";
import { BoxProps } from "@shopify/restyle";
import Box from "./Box";

const Container: React.FC<React.PropsWithChildren<BoxProps<Theme>>> = (
  props,
) => (
  <Box {...props} flex={1} backgroundColor="$background">
    {props.children}
  </Box>
);

export default Container;
