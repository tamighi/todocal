import React from "react";

import { Container, ContainerProps } from "@/atoms";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";
import { SafeAreaView } from "./SafeAreaView";
import { TodoModalProvider, UndoToastProvider } from "@/providers";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView {...rest}>
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
