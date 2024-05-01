import { Box } from "@/atoms";
import { useDatabase } from "@/contexts";
import { Button } from "@/components";

export const DataBackup = () => {
  const { importDb, exportDb } = useDatabase();
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Button
        variant="outlined"
        iconName="save"
        label="Backup data"
        onPress={exportDb}
      />
      <Button
        variant="outlined"
        iconName="upload"
        label="Restore data"
        onPress={importDb}
      />
    </Box>
  );
};
