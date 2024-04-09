import { Box, BoxProps } from "@/atoms";
import { IconButton } from "./IconButton";
import { useTheme } from "@/hooks";

type Props = {
  onCreateClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  mode: "create" | "update";
} & BoxProps;

export const FormActionButtons = (props: Props) => {
  const { onEditClick, onCreateClick, onDeleteClick, mode, ...rest } = props;

  const colors = useTheme().colors;

  return (
    <Box flexDirection="row" paddingHorizontal="l" {...rest}>
      {mode === "update" ? (
        <>
          <IconButton
            color={colors.danger}
            onPress={onDeleteClick}
            name="trash"
          />
          <IconButton
            color={colors.success}
            marginLeft="auto"
            name="edit"
            onPress={onEditClick}
          />
        </>
      ) : (
        <IconButton
          color={colors.success}
          name="plus-circle"
          marginLeft="auto"
          onPress={onCreateClick}
        />
      )}
    </Box>
  );
};
