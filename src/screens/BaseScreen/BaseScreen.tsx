import React from "react";

import { Container, ContainerProps } from "@/atoms";

import { ScreenHeader } from "./ScreenHeader";
import { ScreenFooter } from "./ScreenFooter";
import { SafeAreaView } from "./SafeAreaView";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView {...rest}>
      <ScreenHeader />
      <Container>{children}</Container>
      <ScreenFooter />
    </SafeAreaView>
  );
};
