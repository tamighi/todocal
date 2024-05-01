import { Box, Chip, Text } from "@/atoms";
import { useGetList } from "@/hooks";
import { Tag } from "@/models";
import { Pressable } from "react-native";
import { tagColorPalette } from "@/themes";

type Props = {
  onTagPress?: (tag: Tag) => void;
};

export const TagList = (props: Props) => {
  const { onTagPress } = props;

  const { data: tags } = useGetList("tag");

  const handleTagPress = (tag: Tag) => {
    onTagPress?.(tag);
  };

  return (
    <Box>
      {tags && tags.length > 0 ? (
        <Box gap="xs">
          {tags.map((tag) => {
            return (
              <Pressable onPress={() => handleTagPress(tag)} key={tag.id}>
                <Chip
                  style={{
                    backgroundColor: tag.color || tagColorPalette.green,
                  }}
                >
                  <Text>{tag.name}</Text>
                </Chip>
              </Pressable>
            );
          })}
        </Box>
      ) : (
        <Text>No tags yet</Text>
      )}
    </Box>
  );
};
