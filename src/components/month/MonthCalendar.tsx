import { Container } from "@/atoms";
import MonthCalendarHeader from "./CalendarHeader";
import MonthCalendarBody from "./MonthCalendarBody";

const MonthCalendar = () => {
  return (
    <Container>
      <MonthCalendarHeader />
      <MonthCalendarBody />
    </Container>
  );
};

export default MonthCalendar;
