import { Container, Text } from "@/atoms";
import { Modal, Pressable, SafeAreaView } from "react-native";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingModal: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  return (
    <Modal animationType="slide" visible={open}>
      <Container>
        <SafeAreaView>
          <Text>Hello world</Text>
          <Pressable onPress={onClose}>
            <Text>Close</Text>
          </Pressable>
        </SafeAreaView>
      </Container>
    </Modal>
  );
};
