import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { SettingsSection } from "./SettingsSection";
import { SettingsTagList } from "./SettingsTagList";
import { BaseScreen } from "../BaseScreen";
import { useNavigation } from "@/hooks";

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
      <SettingsSection title="Tags" defaultOpen={true}>
        <SettingsTagList />
      </SettingsSection>
    </BaseScreen>
  );
};
