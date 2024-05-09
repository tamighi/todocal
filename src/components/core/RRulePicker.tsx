import { Box } from "@/atoms";
import { Select } from "./Select";

export const RRulePicker = () => {
  return (
    <Box>
      <Select data={["Daily", "Weekly"]} placeholder="Frequency" />
    </Box>
  );
};
