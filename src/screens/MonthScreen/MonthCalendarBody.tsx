import React from "react";

import { Pressable } from "react-native";

import { Container } from "@/atoms";
import { DayCard } from "@/components";
import { useNavigation } from "@/hooks";
import { getCurrentDayId, getDayArrayFromMonthId } from "@/utils";

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
    <Container gap="xxs">
      {defaultGrid.map((array, index) => (
        <Container key={index} flexDirection="row" gap="xxs">
          {array.map((day) => (
            <Container key={day.id} opacity={day.padDay ? 0.6 : 1}>
              <Pressable
                onPress={() => navigation.navigate("Day", { dayId: day.id })}
                style={{ flex: 1 }}
              >
                <DayCard
                  {...(day.id === getCurrentDayId() && {
                    borderColor: "emphasizeForeground",
                    borderWidth: 2,
                  })}
                  dayId={day.id}
                  small
                />
              </Pressable>
            </Container>
          ))}
        </Container>
      ))}
    </Container>
  );
};

export default MonthCalendarBody;
