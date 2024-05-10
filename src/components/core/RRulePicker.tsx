import React from "react";

import { RRule } from "rrule";

import { Box, BoxProps } from "@/atoms";
import { Multiselect, Select } from "./Dropdowns";

const frequencies = ["DAILY", "WEEKLY"] satisfies typeof RRule.FREQUENCIES;

const freqLabelToValue: { [K in (typeof frequencies)[number]]: string } = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
};

const data = Object.entries(freqLabelToValue).map(([v, k]) => ({
  value: v,
  label: k,
}));

type Props = BoxProps;

export const RRulePicker = (props: Props) => {
  const { ...rest } = props;

  const [type, setType] = React.useState<string>();
  const [frequency, setFrequency] = React.useState(0);

  return (
    <Box gap="xs" {...rest}>
      <Select
        data={data}
        labelKey="label"
        onChange={(v) => setType(v?.value)}
        placeholder="Frequency (never)"
      />
      {type && (
        <Multiselect placeholder="Every (select days)" data={["1", "2", "3"]} />
      )}
    </Box>
  );
};
