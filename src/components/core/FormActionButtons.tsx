import { Box, BoxProps } from "@/atoms";
import { useTheme } from "@/hooks";

import { IconButton } from "./IconButton";

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
    <Box
      flexDirection="row-reverse"
      justifyContent="space-between"
      paddingHorizontal="l"
      {...rest}
    >
      {mode === "update" ? (
        <>
          <IconButton
            color={colors.success}
            name="edit"
            onPress={onEditClick}
          />
          <IconButton
            color={colors.danger}
            onPress={onDeleteClick}
            name="trash"
          />
        </>
      ) : (
        <IconButton
          color={colors.success}
          name="plus-circle"
          onPress={onCreateClick}
        />
      )}
    </Box>
  );
};
