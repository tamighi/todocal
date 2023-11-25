import { createBox } from "@shopify/restyle";
import { Theme } from "../themes";

const Card = createBox<Theme>();
export type CardProps = React.ComponentProps<typeof Card>;

export default Card;
