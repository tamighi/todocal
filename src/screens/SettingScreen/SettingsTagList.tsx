import { Box, Chip, Text } from "@/atoms";
import { useGetList, useTheme } from "@/hooks";
import { Tag } from "@/models";
import { Pressable } from "react-native";
import { useTagModal } from "@/contexts";

export const SettingsTagList = () => {
  const { data: tags } = useGetList("tag");
  const { setTagModalProps } = useTagModal();

  const theme = useTheme();

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
                    backgroundColor: tag.color || theme.colors.chipDefaultColor,
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
