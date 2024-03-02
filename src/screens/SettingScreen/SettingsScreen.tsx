import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Container, Text } from "@/atoms";
import { SettingsSection } from "./SettingsSection";
import { SettingsTagList } from "./SettingsTagList";
import { BaseScreen } from "../BaseScreen";
import { useNavigation } from "@/hooks";
import { TodoFilters } from "./TodoFilters";

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen>
      <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
        <Text variant="title">Settings</Text>
        <Pressable style={{ marginBottom: 12 }} onPress={onClose}>
          <Feather name="chevrons-down" size={32} />
        </Pressable>
      </Box>
      <Container gap="s">
        <SettingsSection title="Tags">
          <SettingsTagList />
        </SettingsSection>
        <SettingsSection title="Filters">
          <TodoFilters />
        </SettingsSection>
      </Container>
    </BaseScreen>
  );
};
