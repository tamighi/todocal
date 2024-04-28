import Modal from "react-native-modal";
import { Box, Text } from "@/atoms";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export const TagListModal = (props: Props) => {
  const { visible, onRequestClose } = props;
  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackButtonPress={onRequestClose}
      onBackdropPress={onRequestClose}
      isVisible={visible}
      style={{ margin: 0 }}
    >
      <Box width="70%" height="100%" bg="mainBackground">
        <Text>Todocal</Text>
      </Box>
    </Modal>
  );
};
