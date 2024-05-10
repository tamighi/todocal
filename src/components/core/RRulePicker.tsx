import React from "react";

import { RRule } from "rrule";

import { Box, BoxProps } from "@/atoms";
import { Multiselect, Select } from "./Dropdowns";

const frequencies = ["DAILY", "WEEKLY"] satisfies typeof RRule.FREQUENCIES;

const freqLabelToValue: { [K in (typeof frequencies)[number]]: string } = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
};

const freqsData = Object.entries(freqLabelToValue).map(([v, k]) => ({
  value: v,
  label: k,
}));

const dailyFreqsData = [
  { value: 1, label: "1 day" },
  ...Array.from({ length: 5 }).map((_, i) => ({
    value: i + 2,
    label: `${i + 2} days`,
  })),
];

const weeklyFreqsData = [
  { value: 1, label: "Monday", inputLabel: "Mon" },
  { value: 2, label: "Tuesday", inputLabel: "Tue" },
  { value: 3, label: "Wednesday", inputLabel: "Wed" },
  { value: 4, label: "Thursday", inputLabel: "Thu" },
  { value: 5, label: "Friday", inputLabel: "Fri" },
  { value: 6, label: "Saturday", inputLabel: "Sat" },
  { value: 7, label: "Sunday", inputLabel: "Sun" },
];

type Props = BoxProps;

export const RRulePicker = (props: Props) => {
  const { ...rest } = props;

  const [freqType, setFreqType] = React.useState<string>();
  const [dayFreq, setDayFreq] = React.useState(0);
  const [weekFreq, setWeekFreq] = React.useState<number[]>();

  const onTypeChange = (type: (typeof freqsData)[number] | null) => {
    setFreqType(type?.value);
    setDayFreq(0);
  };

  const onDayChange = (day: (typeof dailyFreqsData)[number] | null) => {
    setDayFreq(day?.value ?? 0);
  };

  return (
    <Box gap="xs" flexGrow={1} {...rest}>
      <Select
        data={freqsData}
        showClearButton
        labelKey="label"
        onChange={(v) => setFreqType(v?.value)}
        placeholder="Repeat (never)"
        zIndex={110}
      />
      {freqType === "DAILY" && (
        <Select
          placeholder="Every (select recurrence)"
          labelKey="label"
          data={dailyFreqsData}
          onChange={onDayChange}
          dropdownStyle={{ maxHeight: 180, width: 120 }}
        />
      )}
      {freqType === "WEEKLY" && (
        <Multiselect
          placeholder="Every (select days)"
          labelKey="label"
          inputLabelKey="inputLabel"
          valueKey="value"
          data={weeklyFreqsData}
          dropdownStyle={{ maxHeight: 180, width: 120 }}
        />
      )}
    </Box>
  );
};
