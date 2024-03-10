import {
  AllProps,
  VariantProps,
  border,
  createRestyleComponent,
  createVariant,
  spacing,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import { PropsWithChildren } from "react";

type Props = VariantProps<Theme, "cardVariants"> & AllProps<Theme>;

export const Card = createRestyleComponent<PropsWithChildren<Props>, Theme>([
  border,
  spacing,
  createVariant({ themeKey: "cardVariants" }),
]);

export type CardProps = React.ComponentProps<typeof Card>;
