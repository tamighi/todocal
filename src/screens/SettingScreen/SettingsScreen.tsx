import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Container, Text } from "@/atoms";
import { useNavigation } from "@/hooks";

import { SettingsSection } from "./SettingsSection";
import { SettingsTagList } from "./SettingsTagList";
import { BaseScreen } from "../BaseScreen";
import { TodoFilters } from "./TodoFilters";
import { DataBackup } from "./DataBackup";

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen displayHeader={false}>
      <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
        <Text variant="title">Settings</Text>
        <Pressable style={{ marginBottom: 12 }} onPress={onClose}>
          <Feather name="chevrons-down" size={32} />
        </Pressable>
      </Box>
      <Container gap="s">
        <SettingsSection defaultOpen={true} title="Filters">
          <TodoFilters />
        </SettingsSection>
        <SettingsSection defaultOpen={true} title="Tags">
          <SettingsTagList />
        </SettingsSection>
        <SettingsSection defaultOpen={true} title="Data Backup">
          <DataBackup />
        </SettingsSection>
      </Container>
    </BaseScreen>
  );
};
