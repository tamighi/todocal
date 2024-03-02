import { Box, Text } from "@/atoms";

export interface UndoToastProps {
  message?: string;
  callback?: () => void;
  show: boolean;
}

export const UndoToast = (props: UndoToastProps) => {
  const { message = "", show } = props;

  return (
    <Box>
      <Text>{message}</Text>
    </Box>
  );
};
