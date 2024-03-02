import React from "react";

import { Box } from "@/atoms";
import { useGetMany, useNavigation } from "@/hooks";
import { DayCard } from "@/components/day";
import { getCurrentDayId, getDayArrayFromMonthId } from "@/utils";
import { Pressable } from "react-native";

interface Props {
  monthId: string;
}

const MonthCalendarBody: React.FC<Props> = (props) => {
  const { monthId } = props;

  const navigation = useNavigation();
  const defaultGrid = React.useMemo(
    () => getDayArrayFromMonthId(monthId),
    [monthId],
  );

  const [dayGrid, setDayGrid] = React.useState(defaultGrid);

  const { data, status } = useGetMany(
    "day",
    defaultGrid.flat().map(({ id }) => id),
  );

  React.useEffect(() => {
    if (status === "success") {
      const newGrid = defaultGrid.map((arr) => {
        return arr.map((day) => {
          const idx = data.findIndex((d) => d.id === day.id);
          if (idx !== -1) {
            day.todos = data[idx].todos;
          }
          return day;
        });
      });

      setDayGrid(newGrid);
    }
  }, [data, status]);

  return (
    <Box height="100%" gap="xxs">
      {dayGrid.map((array, index) => (
        <Box key={index} flexDirection="row" flex={1} gap="xxs">
          {array.map((day) => (
            <Box key={day.id} flex={1} opacity={day.padDay ? 0.6 : 1}>
              <Pressable
                onPress={() => navigation.navigate("Day", { dayId: day.id })}
                style={{ flex: 1 }}
              >
                <DayCard
                  {...(day.id === getCurrentDayId() && {
                    borderColor: "emphasize",
                    borderWidth: 2,
                  })}
                  dayId={day.id}
                  todos={day.todos}
                  small
                />
              </Pressable>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthCalendarBody;
