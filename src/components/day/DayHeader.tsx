import React from "react";

import { Box, Text } from "@/atoms";

interface Props {
  day: Date;
  dayOnly?: boolean;
}

const DayHeader: React.FC<Props> = (props) => {
  const { day, dayOnly = false } = props;

  return (
    <Box margin="s" alignItems="center">
      <Text>{dayOnly ? day.getDate() : day.toLocaleDateString()}</Text>
    </Box>
  );
};

export default DayHeader;
