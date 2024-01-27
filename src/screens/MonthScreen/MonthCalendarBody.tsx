import { Pressable } from "react-native";

import { Box } from "@/atoms";
import { Month } from "@/models";
import {
  createCalendarGrid,
  padDaysBeforeMonth,
  populateDaysInMonth,
} from "@/utils";
import { useNavigation } from "@/hooks";

import { DayCard } from "@/components/day";

interface Props {
  month: Month;
}

const MonthCalendarBody: React.FC<Props> = (props) => {
  const { month } = props;

  const navigation = useNavigation();

  const populatedMonth = populateDaysInMonth(month);
  const daysWithPadding = padDaysBeforeMonth(populatedMonth);
  const calendarTable = createCalendarGrid(daysWithPadding);

  return (
    <Box height="100%" gap="xxs">
      {calendarTable.map((array, index) => (
        <Box key={index} flexDirection="row" flex={1} gap="xxs">
          {array.map((day, index) => (
            <Box key={index} flex={1}>
              {day && (
                <Pressable
                  onPress={() => navigation.navigate("Day", { dayId: day.id })}
                  style={{ flex: 1 }}
                >
                  <DayCard day={day} small />
                </Pressable>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthCalendarBody;
