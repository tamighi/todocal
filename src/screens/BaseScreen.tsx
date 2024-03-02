import React from "react";

import { Platform, SafeAreaView, StatusBar } from "react-native";

import { Container, ContainerProps } from "@/atoms";
import { useTheme } from "@/hooks";

import { ScreenHeader } from "./ScreenHeader";

type Props = { displayHeader?: boolean } & ContainerProps;

export const BaseScreen: React.FC<Props> = ({
  children,
  displayHeader = true,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: Platform.OS === "ios" ? undefined : 30,
        backgroundColor: colors.mainBackground,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.mainBackground}
      />
      {displayHeader && <ScreenHeader />}
      <Container {...rest}>{children}</Container>
    </SafeAreaView>
  );
};
