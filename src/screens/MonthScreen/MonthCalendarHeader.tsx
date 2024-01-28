import { Box, Text } from "@/atoms";

const daysOfWeek = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

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
