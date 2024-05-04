import React from "react";

import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container, ContainerProps } from "@/atoms";

type Props = ContainerProps & {
  noMarginTop?: boolean;
};

export const SafeAreaView: React.FC<Props> = ({
  children,
  noMarginTop = false,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      style={{
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: noMarginTop ? 0 : insets.top,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
};
