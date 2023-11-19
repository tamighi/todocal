import { createBox } from "@shopify/restyle";
import { Theme } from "../themes";

const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export default Box;
