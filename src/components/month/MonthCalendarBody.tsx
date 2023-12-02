import { Pressable } from "react-native";

import { Box } from "@/atoms";
import { DayComponent } from "../day";
import { Day } from "@/models";
import { createCalendarGrid } from "@/utils";
import { useNavigation } from "@/hooks";

interface Props {
  days: (Day | null)[];
}

const MonthCalendarBody: React.FC<Props> = (props) => {
  const { days } = props;

  const navigation = useNavigation();

  const calendarTable = createCalendarGrid(days);

  return (
    <Box flexDirection="column" height="100%">
      {calendarTable.map((array, index) => (
        <Box key={index} flexDirection="row" flex={1} gap="xxs">
          {array.map((day, index) => (
            <Box key={index} flexDirection="column" flex={1} gap="xxs">
              {day && (
                <Pressable
                  onPress={() => navigation.navigate("Day", { dayId: day.id })}
                  style={{ height: "90%" }}
                >
                  <DayComponent day={day} small />
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
