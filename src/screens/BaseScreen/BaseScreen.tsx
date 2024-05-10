import React from "react";

import { Container, ContainerProps } from "@/atoms";
import { TodoModalProvider, UndoToastProvider } from "@/providers";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";
import { SafeAreaView } from "./SafeAreaView";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView {...rest} position="relative">
      <UndoToastProvider>
        <TodoModalProvider>
          <ScreenHeader />
          <Container>{children}</Container>
          <ScreenFooter />
        </TodoModalProvider>
      </UndoToastProvider>
    </SafeAreaView>
  );
};
