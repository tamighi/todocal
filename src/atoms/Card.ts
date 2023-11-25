import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import Box, { BoxProps } from "./Box";

const Card = createRestyleComponent<
  VariantProps<Theme, "cardVariants"> & BoxProps,
  Theme
>([createVariant({ themeKey: "cardVariants" })], Box);

export type CardProps = React.ComponentProps<typeof Card>;

export default Card;
