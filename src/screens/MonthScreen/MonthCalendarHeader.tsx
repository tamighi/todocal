import { Box, Text } from "@/atoms";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MonthCalendarHeader = () => {
  return (
    <Box flexDirection="row" justifyContent="space-around">
      {daysOfWeek.map((day) => (
        <Text key={day}>{day}</Text>
      ))}
    </Box>
  );
};

export default MonthCalendarHeader;
