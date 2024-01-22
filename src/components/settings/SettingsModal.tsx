import { Box, Container, Text } from "@/atoms";
import { Modal, Pressable, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SettingsSection } from "./SettingsSection";
import { SettingsTagList } from "./SettingsTagList";
import { TagModalProvider } from "@/contexts";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsModal: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  return (
    <Modal animationType="slide" visible={open}>
      <TagModalProvider>
        <Container paddingHorizontal="s" backgroundColor="mainBackground">
          <SafeAreaView style={{ flex: 1 }}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
            >
              <Text variant="title">Settings</Text>
              <Pressable style={{ marginBottom: 12 }} onPress={onClose}>
                <Feather name="chevrons-down" size={32} />
              </Pressable>
            </Box>
            <SettingsSection title="Tags" defaultOpen={true}>
              <SettingsTagList />
            </SettingsSection>
          </SafeAreaView>
        </Container>
      </TagModalProvider>
    </Modal>
  );
};
