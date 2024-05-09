import React from "react";

import { RRule } from "rrule";

import { Box } from "@/atoms";
import { Multiselect, Select } from "./Dropdowns";

const frequencies: typeof RRule.FREQUENCIES = ["DAILY", "WEEKLY"];

export const RRulePicker = () => {
  const [frequency, setFrequency] = React.useState(0);
  return (
    <Box flex={1} gap="xs">
      <Select data={["Daily", "Weekly"]} placeholder="Frequency (never)" />
      <Multiselect placeholder="Every (select days)" data={["1", "2", "3"]} />
    </Box>
  );
};
