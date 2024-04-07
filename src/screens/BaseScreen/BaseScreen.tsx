import React from "react";

import { Platform, SafeAreaView, StatusBar } from "react-native";

import { Container, ContainerProps } from "@/atoms";
import { useTheme } from "@/hooks";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: Platform.OS === "ios" ? undefined : 24,
        backgroundColor: colors.mainBackground,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.mainBackground}
      />
      <ScreenHeader />
      <Container {...rest}>{children}</Container>
      <ScreenFooter />
    </SafeAreaView>
  );
};
