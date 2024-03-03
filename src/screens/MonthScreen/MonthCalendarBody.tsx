import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
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

  return (
    <Box height="100%" gap="xxs">
      {defaultGrid.map((array, index) => (
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
