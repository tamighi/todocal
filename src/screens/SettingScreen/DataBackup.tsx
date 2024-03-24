import { Box } from "@/atoms";
import { useDatabase } from "@/contexts";
import { Button } from "@/components";

export const DataBackup = () => {
  const { importDb, exportDb } = useDatabase();
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Button
        flexDirection="row"
        iconName="save"
        label="Backup data"
        alignItems="center"
        gap="s"
        onPress={exportDb}
      />
      <Button
        flexDirection="row"
        alignItems="center"
        gap="s"
        iconName="upload"
        label="Restore data"
        onPress={importDb}
      />
    </Box>
  );
};
