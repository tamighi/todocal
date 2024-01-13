import { Container } from "@/atoms";
import { Modal, Pressable, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsModal: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  return (
    <Modal animationType="slide" visible={open}>
      <Container backgroundColor="mainBackground">
        <SafeAreaView>
          <Pressable style={{ alignSelf: "flex-end" }} onPress={onClose}>
            <Feather
              name="chevrons-down"
              size={32}
              style={{ marginRight: 6 }}
            />
          </Pressable>
        </SafeAreaView>
      </Container>
    </Modal>
  );
};
