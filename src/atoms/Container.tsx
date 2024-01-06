import Box, { BoxProps } from "./Box";

const Container: React.FC<BoxProps> = (props) => <Box {...props} flex={1} />;
export type ContainerProps = React.ComponentProps<typeof Container>;

export default Container;
