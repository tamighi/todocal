import { Box } from "@/atoms";
import { useTheme } from "@/hooks";
import ColorPicker, {
  Preview,
  Swatches,
  returnedResults,
} from "reanimated-color-picker";

type Props = {
  onChange?: (color: string) => void;
  color?: string;
};

export const TagColorPicker = (props: Props) => {
  const { onChange, color } = props;
  const { colors } = useTheme();

  const handleSelectColor = (color: returnedResults) => {
    onChange?.(color.hex);
  };

  // Get all colors that have "_task" in it.
  const taskColors: string[] = Object.entries(colors)
    .filter(([key]) => key.includes("_task"))
    .map(([_, value]) => value);

  return (
    <ColorPicker
      onComplete={handleSelectColor}
      boundedThumb={true}
      value={color || colors.green_task}
    >
      <Box gap="s" flexDirection="row" padding="s">
        <Swatches
          style={{ flex: 3 }}
          colors={taskColors}
          swatchStyle={{ width: "15%" }}
        />
        <Preview hideText={true} style={{ flex: 1 }} />
      </Box>
    </ColorPicker>
  );
};
