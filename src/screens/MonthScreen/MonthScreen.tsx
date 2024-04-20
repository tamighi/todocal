import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { getNextMonthId, getPrevMonthId } from "@/utils";
import { Container } from "@/atoms";
import { Swipeable } from "@/components";

import { BaseScreen } from "../BaseScreen";
import { MonthScreenNavigation } from "./MonthScreenNavigation";
import { MonthCalendar } from "./MonthCalendar";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

const createMonthArray = (monthId: string) => {
  return [getPrevMonthId(monthId), monthId, getNextMonthId(monthId)];
};

export const MonthScreen: React.FC<Props> = ({ route }) => {
  const { monthId } = route.params;
  const [monthArray, setMonthArray] = React.useState(createMonthArray(monthId));

  return (
    <BaseScreen>
      <Swipeable>
        {monthArray.map((monthId) => {
          return (
            <Container key={monthId}>
              <MonthScreenNavigation monthId={monthId} />
              <MonthCalendar monthId={monthId} />
            </Container>
          );
        })}
      </Swipeable>
    </BaseScreen>
  );
};
