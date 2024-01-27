import React from "react";

import { Box, Text, Container, ContainerProps, Button } from "@/atoms";
import { SettingsModal } from "@/components";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "@/hooks";

type Props = ContainerProps;

export const BaseScreen: React.FC<Props> = ({ children, ...rest }) => {
  const [openSettings, setOpenSettings] = React.useState(false);
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: Platform.OS === "ios" ? undefined : 30,
        backgroundColor: colors.mainBackground,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.mainBackground}
      />
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
