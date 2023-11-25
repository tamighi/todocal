import React from "react";
import { Box, Text } from "@/atoms";

interface Props {
  day?: string;
}

const DayHeader: React.FC<Props> = (props) => {
  const { day = new Date().toLocaleDateString() } = props;

  return (
    <Box margin="s">
      <Text>{day}</Text>
    </Box>
  );
};

export default DayHeader;
