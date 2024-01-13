import React from "react";

import { Box, Text, Container, ContainerProps, Button } from "@/atoms";
import { SettingsModal } from "@/components";
import { SafeAreaView } from "react-native";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  const [openSettings, setOpenSettings] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box alignSelf="flex-end">
        <Button style={{ margin: 4 }} onPress={() => setOpenSettings(true)}>
          <Text>Settings</Text>
        </Button>
      </Box>
      <Container {...rest}>{children}</Container>
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </SafeAreaView>
  );
};
