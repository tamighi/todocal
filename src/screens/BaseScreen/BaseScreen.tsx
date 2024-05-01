import React from "react";

import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, Container, ContainerProps } from "@/atoms";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      style={{
        flex: 1,
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: insets.top,
      }}
      backgroundColor="mainBackground"
    >
      <ScreenHeader />
      <Container {...rest}>{children}</Container>
      <ScreenFooter />
    </Box>
  );
};
