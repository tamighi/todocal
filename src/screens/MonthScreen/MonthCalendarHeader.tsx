import { Box, Text } from "@/atoms";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MonthCalendarHeader = () => {
  return (
    <Box flexDirection="row">
      {daysOfWeek.map((day) => (
        <Box key={day} flex={1} alignItems="center">
          <Text>{day}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default MonthCalendarHeader;
