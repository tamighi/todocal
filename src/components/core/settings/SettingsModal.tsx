import { Container } from "@/atoms";
import { Modal, Pressable, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SettingsSection } from "./SettingsSection";
import { SettingsTagList } from "./SettingsTagList";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsModal: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  return (
    <Modal animationType="slide" visible={open}>
      <Container paddingHorizontal="s" backgroundColor="mainBackground">
        <SafeAreaView style={{ flex: 1 }}>
          <Pressable
            style={{ alignSelf: "flex-end", marginBottom: 12 }}
            onPress={onClose}
          >
            <Feather
              name="chevrons-down"
              size={32}
              style={{ marginRight: 6 }}
            />
          </Pressable>
          <SettingsSection title="Tags">
            <SettingsTagList />
          </SettingsSection>
        </SafeAreaView>
      </Container>
    </Modal>
  );
};
