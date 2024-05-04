import React from "react";

import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container, ContainerProps } from "@/atoms";

type Props = ContainerProps;

export const SafeAreaView: React.FC<Props> = ({ children, ...rest }) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      style={{
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: insets.top,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
};
