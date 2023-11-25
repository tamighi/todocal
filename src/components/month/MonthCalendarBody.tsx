import { Box, Text } from "@/atoms";
import { StyleSheet } from "react-native";

const getDayArray = () => {
  const currentDate = new Date();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );

  // Create an array to represent each day in the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Create an array to represent the blank cells before the first day of the month
  const blanksBefore = Array.from({ length: firstDayOfMonth }, () => null);

  return [...blanksBefore, ...monthDays];
};

const MonthCalendarBody = () => {
  const dayArray = getDayArray();
  return (
    <Box style={styles.daysContainer}>
      {dayArray.map((day, index) => (
        <Box key={index} style={styles.dayCell}>
          <Text style={styles.dayText}>{day}</Text>
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayHeader: {
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 7 days in a week
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  dayText: {
    textAlign: "center",
  },
});

export default MonthCalendarBody;
