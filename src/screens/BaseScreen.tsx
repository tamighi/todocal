import { Box, Text, Container, ContainerProps } from "@/atoms";
import { Pressable, SafeAreaView } from "react-native";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box alignSelf="flex-end">
        <Pressable>
          <Text>Settings</Text>
        </Pressable>
      </Box>
      <Container {...rest}>{children}</Container>
    </SafeAreaView>
  );
};
