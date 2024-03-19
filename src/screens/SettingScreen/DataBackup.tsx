import { Box, Text } from "@/atoms";
import { Database } from "@/database";
import { Pressable } from "react-native";

export const DataBackup = () => {
  return (
    <Box>
      <Pressable onPress={Database.export}>
        <Text>Data backup</Text>
      </Pressable>
      <Pressable onPress={Database.import}>
        <Text>Data restore</Text>
      </Pressable>
    </Box>
  );
};
