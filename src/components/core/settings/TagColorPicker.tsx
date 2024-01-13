import { Box } from "@/atoms";
import { useTheme } from "@/hooks";
import ColorPicker, {
  HueSlider,
  Preview,
  returnedResults,
} from "reanimated-color-picker";

type Props = {
  onChange?: (color: string) => void;
  color?: string;
};

export const TagColorPicker = (props: Props) => {
  const { onChange, color } = props;
  const theme = useTheme();

  const handleSelectColor = (color: returnedResults) => {
    onChange?.(color.hex);
  };

  return (
    <ColorPicker
      onComplete={handleSelectColor}
      boundedThumb={true}
      value={color || theme.colors.chipDefaultBackground}
    >
      <Box gap="s" flexDirection="row" padding="s">
        <HueSlider style={{ flex: 3 }} />
        <Preview hideText={true} style={{ flex: 1 }} />
      </Box>
    </ColorPicker>
  );
};
