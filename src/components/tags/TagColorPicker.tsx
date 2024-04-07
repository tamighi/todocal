import { Box } from "@/atoms";
import { tagColorPalette } from "@/themes";
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

  const handleSelectColor = (color: returnedResults) => {
    onChange?.(color.hex);
  };

  const tagColors: string[] = Object.entries(tagColorPalette).map(
    ([_, value]) => value,
  );

  return (
    <ColorPicker
      onComplete={handleSelectColor}
      boundedThumb={true}
      value={color || tagColorPalette.green}
    >
      <Box gap="s" flexDirection="row" padding="s">
        <Swatches
          style={{ flex: 3 }}
          colors={tagColors}
          swatchStyle={{ width: "15%" }}
        />
        <Preview hideText={true} style={{ flex: 1 }} />
      </Box>
    </ColorPicker>
  );
};
