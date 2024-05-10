import React from "react";

import { RRule } from "rrule";

import { Box, BoxProps } from "@/atoms";
import { Multiselect, Select } from "./Dropdowns";

const frequencies: typeof RRule.FREQUENCIES = ["DAILY", "WEEKLY"];

type Props = BoxProps;

export const RRulePicker = (props: Props) => {
  const { ...rest } = props;

  const [frequency, setFrequency] = React.useState(0);
  return (
    <Box gap="xs" {...rest}>
      <Select data={["Daily", "Weekly"]} placeholder="Frequency (never)" />
      <Multiselect placeholder="Every (select days)" data={["1", "2", "3"]} />
    </Box>
  );
};
