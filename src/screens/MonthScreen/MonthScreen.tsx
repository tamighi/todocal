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

export const MonthScreen: React.FC<Props> = ({ route }) => {
  const { monthId } = route.params;

  const [monthArray, setMonthArray] = React.useState(getMonthArray(monthId));
  const pagerRef = React.useRef<PagerView>(null);

  React.useEffect(() => {
    setMonthArray(getMonthArray(monthId));
    pagerRef.current?.setPage(2);
  }, [monthId]);

  const onPageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>,
  ) => {
    if (e.nativeEvent.position <= 1) {
      setMonthArray((prev) => [getPrevMonthId(prev[0]), ...prev].slice(0, 5));
    }

    if (e.nativeEvent.position >= monthArray.length - 2) {
      setMonthArray((prev) =>
        [...prev, getNextMonthId(prev.at(-1) as string)].slice(-5),
      );
    }
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
