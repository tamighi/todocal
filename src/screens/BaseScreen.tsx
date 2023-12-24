import { Container, ContainerProps } from "@/atoms";
import { SafeAreaView } from "react-native";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container {...rest}>{children}</Container>
    </SafeAreaView>
  );
};
