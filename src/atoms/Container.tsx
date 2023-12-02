import Box, { BoxProps } from "./Box";

const Container: React.FC<BoxProps> = (props) => <Box {...props} flex={1} />;

export default Container;
