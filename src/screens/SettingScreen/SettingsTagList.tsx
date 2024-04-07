import { Box, Chip, Text } from "@/atoms";
import { useGetList } from "@/hooks";
import { Tag } from "@/models";
import { Pressable } from "react-native";
import { useTagModal } from "@/contexts";
import { tagColorPalette } from "@/themes";

export const SettingsTagList = () => {
  const { data: tags } = useGetList("tag");
  const { setTagModalProps } = useTagModal();

  const handleTagPress = (tag: Tag) => {
    setTagModalProps({ open: true, tag: tag });
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
