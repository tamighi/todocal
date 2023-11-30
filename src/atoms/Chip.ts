import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import Box, { BoxProps } from "./Box";

const Chip = createRestyleComponent<
  VariantProps<Theme, "chipVariants"> & BoxProps,
  Theme
>([createVariant({ themeKey: "chipVariants" })], Box);

export type ChipProps = React.ComponentProps<typeof Chip>;

export default Chip;
