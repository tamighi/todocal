import { Container } from "@/atoms";

import MonthCalendarHeader from "./MonthCalendarHeader";
import MonthCalendarBody from "./MonthCalendarBody";

interface Props {
  monthId: string;
}

export const MonthCalendar: React.FC<Props> = (props) => {
  const { monthId } = props;

  return (
    <Container width="100%" p="xs">
      <MonthCalendarHeader />
      <MonthCalendarBody monthId={monthId} />
    </Container>
  );
};
