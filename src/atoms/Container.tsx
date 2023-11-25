import Box, { BoxProps } from "./Box";

const Container: React.FC<BoxProps> = (props) => (
  <Box {...props} flex={1} backgroundColor="$background" />
);

export default Container;
