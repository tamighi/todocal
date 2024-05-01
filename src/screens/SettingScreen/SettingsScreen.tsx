import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, Container, Text } from "@/atoms";
import { IconButton } from "@/components";
import { useNavigation } from "@/hooks";

import { SettingsSection } from "./SettingsSection";
import { DataBackup } from "./DataBackup";

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <Box
      style={{
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: insets.top,
      }}
      flex={1}
      backgroundColor="mainBackground"
    >
      <ScrollView>
        <Container margin="s">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="s"
            borderBottomColor="mainForeground"
            borderBottomWidth={1}
          >
            <Text fontWeight="bold">Todocal</Text>
            <IconButton name="x" onPress={onClose} />
          </Box>
          <Container gap="s">
            <SettingsSection title="Data Backup">
              <DataBackup />
            </SettingsSection>
          </Container>
        </Container>
      </ScrollView>
    </Box>
  );
};
