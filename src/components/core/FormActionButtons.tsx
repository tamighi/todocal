import { Feather } from "@expo/vector-icons";

import { Box, BoxProps, Button } from "@/atoms";

type Props = {
  onCreateClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  mode: "create" | "update";
} & BoxProps;

export const FormActionButtons = (props: Props) => {
  const { onEditClick, onCreateClick, onDeleteClick, mode, ...rest } = props;

  return (
    <Box flexDirection="row" paddingHorizontal="lg" {...rest}>
      {mode === "update" ? (
        <>
          <Button variant="icon" onPress={onDeleteClick}>
            <Feather name="trash" size={24} color="red" />
          </Button>
          <Button
            variant="icon"
            style={{ marginLeft: "auto" }}
            onPress={onEditClick}
          >
            <Feather name="edit" size={24} color="green" />
          </Button>
        </>
      ) : (
        <Button style={{ marginLeft: "auto" }} onPress={onCreateClick}>
          <Feather name="plus-circle" size={24} color="green" />
        </Button>
      )}
    </Box>
  );
};
