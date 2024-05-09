import { Box } from "@/atoms";
import { Select } from "./Dropdowns";

export const RRulePicker = () => {
  return (
    <Box>
      <Select data={["Daily", "Weekly"]} placeholder="Frequency" />
    </Box>
  );
};
