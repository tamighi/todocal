import { Theme } from "@/themes";
import { useTheme as RNuseTheme } from "@shopify/restyle";

export const useTheme = RNuseTheme<Theme>;
