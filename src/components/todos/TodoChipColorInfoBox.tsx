import { Box, BoxProps } from "@/atoms";
import { tagColorPalette } from "@/themes";

type Props = {
  color?: string;
  urgent?: boolean;
  important?: boolean;
} & BoxProps;

export const TodoChipColorInfoBox = (props: Props) => {
  const { color, urgent = false, important = false, ...rest } = props;

  return (
    <Box
      style={{
        backgroundColor: color || tagColorPalette.green,
      }}
      height="100%"
      borderRadius="xxs"
      width={8}
      {...rest}
    ></Box>
  );
};
