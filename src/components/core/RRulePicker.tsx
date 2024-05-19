import React from "react";

import { Frequency, RRule } from "rrule";

import { Box, BoxProps } from "@/atoms";
import { Multiselect, Select } from "./Dropdowns";

type Freq = {
  value: number;
  label: string;
  inputLabel?: string;
};

const frequencies = [Frequency.DAILY, Frequency.WEEKLY] satisfies Frequency[];

const freqLabelToValue: { [K in (typeof frequencies)[number]]: string } = {
  [Frequency.DAILY]: "Daily",
  [Frequency.WEEKLY]: "Weekly",
};

const freqsData: Freq[] = Object.entries(freqLabelToValue).map(([v, k]) => ({
  value: Number(v),
  label: k,
}));

const dailyFreqsData: Freq[] = [
  { value: 1, label: "1 day" },
  ...Array.from({ length: 5 }).map((_, i) => ({
    value: i + 2,
    label: `${i + 2} days`,
  })),
];

const weeklyFreqsData: Freq[] = [
  { value: 0, label: "Monday", inputLabel: "Mon" },
  { value: 1, label: "Tuesday", inputLabel: "Tue" },
  { value: 2, label: "Wednesday", inputLabel: "Wed" },
  { value: 3, label: "Thursday", inputLabel: "Thu" },
  { value: 4, label: "Friday", inputLabel: "Fri" },
  { value: 5, label: "Saturday", inputLabel: "Sat" },
  { value: 6, label: "Sunday", inputLabel: "Sun" },
];

type Props = {
  onValueChange?: (value: RRule | null) => void;
  value?: RRule;
  startDate?: Date;
} & BoxProps;

export const RRulePicker = (props: Props) => {
  const { onValueChange, value, startDate, ...rest } = props;

  const [_, setCurrentValue] = React.useState<RRule | null>(null);

  const [freqType, setFreqType] = React.useState<Freq | null>(null);
  const [dayFreq, setDayFreq] = React.useState<Freq | null>(null);
  const [weekFreq, setWeekFreq] = React.useState<Freq[]>([]);

  React.useEffect(() => {
    setCurrentValue(value ?? null);

    setFreqType(freqsData.find((d) => d.value === value?.options.freq) ?? null);
    setWeekFreq(
      value?.options.byweekday.map(
        (v) => weeklyFreqsData.find((d) => d.value === v) as Freq,
      ) ?? [],
    );
    setDayFreq(
      dailyFreqsData.find((d) => d.value === value?.options.interval) ?? null,
    );
  }, [value]);

  const onTypeChange = (type: Freq | null) => {
    setFreqType(type);

    setDayFreq(null);
    setWeekFreq([]);
    setCurrentValue(null);
    onValueChange?.(null);
  };

  const onDayChange = (day: Freq | null) => {
    setDayFreq(day);
    const rrule = new RRule({
      freq: Frequency.DAILY,
      dtstart: startDate,
      interval: day?.value,
    });

    setCurrentValue(rrule);
    onValueChange?.(rrule);
  };

  const onWeekChange = (weeks: Freq[]) => {
    setWeekFreq(weeks);

    const rrule =
      weeks.length > 0
        ? new RRule({
            freq: Frequency.WEEKLY,
            dtstart: startDate,
            byweekday: weeks.map((w) => w.value),
          })
        : null;

    setCurrentValue(rrule);
    onValueChange?.(rrule);
  };

  return (
    <Box gap="xs" flexGrow={1} {...rest}>
      <Select
        data={freqsData}
        onChange={onTypeChange}
        labelKey="label"
        value={freqType}
        showClearButton
        placeholder="Repeat (never)"
        zIndex={110}
      />
      {freqType?.value === Frequency.DAILY && (
        <Select
          placeholder="Every (select recurrence)"
          labelKey="label"
          data={dailyFreqsData}
          onChange={onDayChange}
          value={dayFreq}
          dropdownStyle={{ maxHeight: 180, width: 120 }}
        />
      )}
      {freqType?.value === Frequency.WEEKLY && (
        <Multiselect
          placeholder="Every (select days)"
          labelKey="label"
          inputLabelKey="inputLabel"
          valueKey="value"
          data={weeklyFreqsData}
          onChange={onWeekChange}
          values={weekFreq}
          dropdownStyle={{ maxHeight: 180, width: 120 }}
        />
      )}
    </Box>
  );
};
