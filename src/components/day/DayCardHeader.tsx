import React from "react";

import { Box, Text } from "@/atoms";

interface Props {
  day: Date;
  dayOnly?: boolean;
}

export const DayCardHeader: React.FC<Props> = (props) => {
  const { day, dayOnly = false } = props;

  return (
    <Box marginVertical={dayOnly ? "none" : "s"} alignItems="center">
      <Text>{dayOnly ? day.getDate() : day.toLocaleDateString()}</Text>
    </Box>
  );
};
