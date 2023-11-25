import { Box, BoxProps } from "@/atoms";

const Container: React.FC<BoxProps> = (props) => (
  <Box {...props} flex={1} backgroundColor="$background" />
);

export default Container;
