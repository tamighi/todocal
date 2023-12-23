import { Container } from "@/atoms";
import { Month } from "@/models";

import MonthCalendarHeader from "./MonthCalendarHeader";
import MonthCalendarBody from "./MonthCalendarBody";

interface Props {
  month: Month;
}

const MonthCalendar: React.FC<Props> = (props) => {
  const { month } = props;

  return (
    <Container width="100%">
      <MonthCalendarHeader />
      <MonthCalendarBody month={month} />
    </Container>
  );
};

export default MonthCalendar;
