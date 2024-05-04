import React from "react";

import { Container, ContainerProps } from "@/atoms";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";
import { SafeAreaView } from "./SafeAreaView";
import { TodoModalProvider } from "@/providers";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView {...rest}>
      <TodoModalProvider>
        <ScreenHeader />
        <Container>{children}</Container>
        <ScreenFooter />
      </TodoModalProvider>
    </SafeAreaView>
  );
};
