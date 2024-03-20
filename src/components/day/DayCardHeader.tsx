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
      <Text
        fontSize={dayOnly ? 12 : undefined}
        lineHeight={dayOnly ? 18 : undefined}
      >
        {dayOnly ? day.getDate() : day.toLocaleDateString()}
      </Text>
    </Box>
  );
};
