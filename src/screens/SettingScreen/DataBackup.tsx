import { Box, Text } from "@/atoms";
import { exportDB, importDB } from "@/utils";
import { Pressable } from "react-native";

export const DataBackup = () => {
  return (
    <Box>
      <Pressable onPress={exportDB}>
        <Text>Data backup</Text>
      </Pressable>
      <Pressable onPress={importDB}>
        <Text>Data restore</Text>
      </Pressable>
    </Box>
  );
};
