import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { useDatabase } from "@/contexts";
import { Button } from "@/components";

export const DataBackup = () => {
  const { importDb, exportDb } = useDatabase();
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Button
        flexDirection="row"
        alignItems="center"
        gap="s"
        onPress={exportDb}
      >
        <Feather name="save" size={24} />
        <Text>Backup data</Text>
      </Button>
      <Button
        flexDirection="row"
        alignItems="center"
        gap="s"
        onPress={importDb}
      >
        <Feather name="upload" size={16} />
        <Text>Restore data</Text>
      </Button>
    </Box>
  );
};
