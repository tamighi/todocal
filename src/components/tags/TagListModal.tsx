import Modal from "react-native-modal";
import { Box, Text } from "@/atoms";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export const TagListModal = (props: Props) => {
  const { visible, onRequestClose } = props;
  return (
    <Modal onBackdropPress={onRequestClose} isVisible={visible}>
      <Box height="100%" bg="mainBackground">
        <Text>Todocal</Text>
      </Box>
    </Modal>
  );
};
