import { Box, BoxProps } from "@/atoms";
import { useTheme } from "@/hooks";

type Props = {
  color?: string;
  urgent?: boolean;
  important?: boolean;
} & BoxProps;

export const TodoChipColorInfoBox = (props: Props) => {
  const { color, urgent = false, important = false, ...rest } = props;

  const { colors } = useTheme();

  return (
    <Box
      style={{
        backgroundColor: color || colors.chipDefaultColor,
      }}
      height="100%"
      borderRadius="xxs"
      position="relative"
      {...rest}
    >
      <Box position="absolute">
        {urgent ? (
          <Box height="20%" backgroundColor="chipUrgentColor"></Box>
        ) : null}
        {important ? (
          <Box height="20%" backgroundColor="chipImportantColor"></Box>
        ) : null}
      </Box>
    </Box>
  );
};
