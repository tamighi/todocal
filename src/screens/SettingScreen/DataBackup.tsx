import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { useDatabase } from "@/contexts";

export const DataBackup = () => {
  const { importDb, exportDb } = useDatabase();
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Pressable onPress={exportDb}>
        <Box flexDirection="row" alignItems="center" gap="s">
          <Feather name="save" size={16} />
          <Text>Backup data</Text>
        </Box>
      </Pressable>
      <Pressable onPress={importDb}>
        <Box flexDirection="row" alignItems="center" gap="s">
          <Feather name="upload" size={16} />
          <Text>Restore data</Text>
        </Box>
      </Pressable>
    </Box>
  );
};
