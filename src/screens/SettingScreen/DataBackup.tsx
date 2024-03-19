import { Box, Text } from "@/atoms";
import { useDatabase } from "@/contexts";
import { Pressable } from "react-native";

export const DataBackup = () => {
  const { importDb, exportDb } = useDatabase();
  return (
    <Box>
      <Pressable onPress={exportDb}>
        <Text>Data backup</Text>
      </Pressable>
      <Pressable onPress={importDb}>
        <Text>Data restore</Text>
      </Pressable>
    </Box>
  );
};
