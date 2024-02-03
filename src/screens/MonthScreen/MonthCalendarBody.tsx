import { Pressable } from "react-native";

import { Box } from "@/atoms";
import { useGetMany, useNavigation } from "@/hooks";

import { DayCard } from "@/components/day";
import { getDayArrayFromMonthId } from "@/utils";

interface Props {
  monthId: string;
}

const MonthCalendarBody: React.FC<Props> = (props) => {
  const { monthId } = props;
  const navigation = useNavigation();

  const dayGrid = getDayArrayFromMonthId(monthId);
  const data = useGetMany(
    "day",
    dayGrid.flat().map(({ id }) => id),
  );

  return (
    <Box height="100%" gap="xxs">
      {dayGrid.map((array, index) => (
        <Box key={index} flexDirection="row" flex={1} gap="xxs">
          {array.map((day, index) => (
            <Box key={index} flex={1}>
              <Pressable
                onPress={() => navigation.navigate("Day", { dayId: day.id })}
                style={{ flex: 1, opacity: day.padDay ? 0.6 : 1 }}
              >
                <DayCard day={day} small />
              </Pressable>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthCalendarBody;
