import React from "react";

import { NativeSyntheticEvent } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PagerView from "react-native-pager-view";

import { RootStackParamList } from "@/Navs";
import { getNextMonthId, getPrevMonthId } from "@/utils";
import { Box } from "@/atoms";

import { BaseScreen } from "../BaseScreen";
import { MonthCalendar } from "./MonthCalendar";
import { MonthScreenNavigation } from "./MonthScreenNavigation";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

const getMonthArray = (month: string) => {
  const prevMonth = getPrevMonthId(month);
  const twoMonthAgo = getPrevMonthId(prevMonth);
  const nextMonth = getNextMonthId(month);
  const twoMonthAhead = getNextMonthId(nextMonth);

  return [twoMonthAgo, prevMonth, month, nextMonth, twoMonthAhead];
};

export const MonthScreen: React.FC<Props> = ({ route, navigation }) => {
  const { monthId } = route.params;

  const [monthArray, setMonthArray] = React.useState(getMonthArray(monthId));
  const pagerRef = React.useRef<PagerView>(null);

  React.useEffect(() => {
    setMonthArray(getMonthArray(monthId));
  }, [monthId]);

  const onPageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>,
  ) => {
    const index = e.nativeEvent.position;
    const monthId = monthArray[index];
    setMonthArray(getMonthArray(monthId));
    navigation.setParams({ monthId });
  };

  return (
    <BaseScreen>
      <PagerView
        style={{ flex: 1 }}
        onPageSelected={onPageSelected}
        ref={pagerRef}
        initialPage={2}
      >
        {monthArray.map((monthId) => (
          <Box key={monthId}>
            <MonthScreenNavigation monthId={monthId} />
            <MonthCalendar monthId={monthId} />
          </Box>
        ))}
      </PagerView>
    </BaseScreen>
  );
};
