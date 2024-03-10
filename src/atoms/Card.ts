import {
  AllProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "@/themes";
import { PropsWithChildren } from "react";

type Props = VariantProps<Theme, "cardVariants"> & AllProps<Theme>;

export const Card = createRestyleComponent<PropsWithChildren<Props>, Theme>([
  createVariant({ themeKey: "cardVariants" }),
]);
