import { Box, BoxProps } from "@/atoms";
import { IconButton } from "./IconButton";

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
          <IconButton color="red" onPress={onDeleteClick} name="trash" />
          <IconButton
            color="green"
            style={{ marginLeft: "auto" }}
            name="edit"
            onPress={onEditClick}
          />
        </>
      ) : (
        <IconButton
          color="green"
          name="plus-circle"
          style={{ marginLeft: "auto" }}
          onPress={onCreateClick}
        />
      )}
    </Box>
  );
};
