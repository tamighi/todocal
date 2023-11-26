import { Container } from "@/atoms";
import { Month } from "@/models";
import { padDaysBeforeMonth, populateDaysInMonth } from "@/utils";

import MonthCalendarHeader from "./MonthCalendarHeader";
import MonthCalendarBody from "./MonthCalendarBody";

interface Props {
  month: Month;
}

const MonthCalendar: React.FC<Props> = (props) => {
  const { month } = props;

  const populatedMonth = populateDaysInMonth(month);

  const daysWithPadding = padDaysBeforeMonth(populatedMonth);

  return (
    <Container width="100%">
      <MonthCalendarHeader />
      <MonthCalendarBody days={daysWithPadding} />
    </Container>
  );
};

export default MonthCalendar;
