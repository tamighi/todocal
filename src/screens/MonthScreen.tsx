import { Container, Text } from "@/atoms";
import { MonthCalendar } from "@/components";
import { useMonth } from "@/hooks";
import { getDefaultMonthId } from "@/utils";

export interface MonthScreenProps {
  monthId?: string;
}

const MonthScreen: React.FC<MonthScreenProps> = (props) => {
  const { monthId = getDefaultMonthId() } = props;

  const { month } = useMonth(monthId);

  return (
    <Container justifyContent="center" alignItems="center">
      {month ? <MonthCalendar month={month} /> : <Text>Loading ...</Text>}
    </Container>
  );
};

export default MonthScreen;
