import { Pressable } from "react-native";

import { Box } from "@/atoms";
import { Day } from "@/models";
import { createCalendarGrid } from "@/utils";
import { useNavigation } from "@/hooks";

import { DayCard } from "../day";

interface Props {
  days: (Day | null)[];
}

const MonthCalendarBody: React.FC<Props> = (props) => {
  const { days } = props;

  const navigation = useNavigation();

  const calendarTable = createCalendarGrid(days);

  return (
    <Box flexDirection="column" height="100%" gap="xxs">
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
