import { Pressable } from "react-native";

import { Box } from "@/atoms";
import { DayComponent } from "@/components";
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
    <Box flexDirection="column" height="90%">
      {calendarTable.map((array, index) => (
        <Box key={index} flexDirection="row" flex={1}>
          {array.map((day, index) => (
            <Box key={index} flex={1} margin="s">
              {day && (
                <Pressable
                  onPress={() => navigation.navigate("Day", { dayId: day.id })}
                >
                  <DayComponent day={day} />
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
