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
        backgroundColor: color || colors.green_task,
      }}
      height="100%"
      borderRadius="xxs"
      position="relative"
      width={8}
      {...rest}
    >
      <Box height="100%" width="100%" position="absolute">
        {urgent ? <Box height="20%" backgroundColor="chipUrgent"></Box> : null}
        {important ? (
          <Box height="20%" backgroundColor="chipImportant"></Box>
        ) : null}
      </Box>
    </Box>
  );
};
