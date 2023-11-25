import { Box } from "@/atoms";
import { StyleSheet } from "react-native";
import { DayComponent } from "../day";

const getCalendarTable = () => {
  const currentDate = new Date();

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );

  const monthDays = Array.from(
    { length: daysInMonth + firstDayOfMonth },
    (_, i) => {
      const day = i + 1 - firstDayOfMonth;
      return day > 0
        ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        : null;
    },
  );

  const calendarTable: (Date | null)[][] = [];

  let rowIndex = -1;

  monthDays.forEach((day, index) => {
    if (index % 7 === 0) {
      rowIndex++;
      calendarTable[rowIndex] = [];
    }
    calendarTable[rowIndex].push(day);
  });

  while (calendarTable[rowIndex].length < 7) calendarTable[rowIndex].push(null);

  return calendarTable;
};

const MonthCalendarBody = () => {
  const calendarTable = getCalendarTable();

  return (
    <Box style={styles.daysContainer}>
      {calendarTable.map((array, index) => (
        <Box key={index} style={styles.daysRow}>
          {array.map((day, index) => (
            <Box key={index} style={styles.dayCell}>
              {day && <DayComponent day={day} />}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: "column",
    height: "100%",
  },
  daysRow: {
    flexDirection: "row",
    flex: 1,
  },
  dayCell: {
    flex: 1,
    margin: 3,
  },
});

export default MonthCalendarBody;
