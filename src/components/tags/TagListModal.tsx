import Modal from "react-native-modal";
import { Box, Text } from "@/atoms";
import { TagList } from "./TagList";
import { IconButton } from "../core";

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
      <Box width="70%" px="s" height="100%" bg="mainBackground">
        <Box
          pl="s"
          mb="s"
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderBottomColor="mainForeground"
          borderBottomWidth={1}
        >
          <Text fontWeight="bold">Todocal</Text>
          <IconButton onPress={onRequestClose} name="x" />
        </Box>
        <TagList onTagPress={onRequestClose} />
      </Box>
    </Modal>
  );
};
