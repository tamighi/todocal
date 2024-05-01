import { ScrollView } from "react-native-gesture-handler";

import { Box, Container, Text } from "@/atoms";
import { IconButton } from "@/components";
import { useNavigation } from "@/hooks";

import { SettingsSection } from "./SettingsSection";
import { BaseScreen } from "../BaseScreen";
import { DataBackup } from "./DataBackup";

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen>
      <ScrollView>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="s"
        >
          <Text variant="title">Settings</Text>
          <IconButton name="chevrons-down" onPress={onClose} />
        </Box>
        <Container gap="s">
          <SettingsSection title="Data Backup">
            <DataBackup />
          </SettingsSection>
        </Container>
      </ScrollView>
    </BaseScreen>
  );
};
