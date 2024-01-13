import { Box, Chip, Text } from "@/atoms";
import { useGetList, useTheme } from "@/hooks";

export const SettingsTagList = () => {
  const { data: tags } = useGetList("tag");
  const theme = useTheme();

  return (
    <Box>
      {tags && tags.length > 0 ? (
        <Box gap="xs">
          {tags.map((tag) => {
            return (
              <Chip
                key={tag.id}
                style={{
                  backgroundColor:
                    tag.color || theme.colors.chipDefaultBackground,
                }}
              >
                <Text>{tag.name}</Text>
              </Chip>
            );
          })}
        </Box>
      ) : (
        <Text>No tags yet</Text>
      )}
    </Box>
  );
};
