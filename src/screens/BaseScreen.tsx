import React from "react";

import { Box, Text, Container, ContainerProps } from "@/atoms";
import { SettingsModal } from "@/components";
import { Pressable, SafeAreaView } from "react-native";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  const [openSettings, setOpenSettings] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box alignSelf="flex-end">
        <Pressable onPress={() => setOpenSettings(true)}>
          <Text>Settings</Text>
        </Pressable>
      </Box>
      <Container {...rest}>{children}</Container>
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </SafeAreaView>
  );
};
