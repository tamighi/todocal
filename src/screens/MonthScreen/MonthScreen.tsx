import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InfinitePager, {
  InfinitePagerImperativeApi,
} from "react-native-infinite-pager";

import { RootStackParamList } from "@/Navs";
import { Container } from "@/atoms";
import {
  getCurrentDayId,
  getCurrentMonthId,
  getDayIdFromDate,
  getMonthIdFromDayId,
} from "@/utils";

import { BaseScreen } from "../BaseScreen";
import { MonthScreenNavigation } from "./MonthScreenNavigation";
import { MonthCalendar } from "./MonthCalendar";
import { useSharedValue } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, "Month">;

const getMonthIdFromIndex = (idx: number) => {
  const currentDay = new Date(getCurrentDayId());
  currentDay.setMonth(currentDay.getMonth() + idx);

  const dayId = getDayIdFromDate(currentDay);
  return getMonthIdFromDayId(dayId);
};

const getIndexFromMonthId = (monthId: string) => {
  const currMonth = new Date(`${getCurrentMonthId()}-01`);
  const newMonth = new Date(`${monthId}-01`);

  const diffInYears = newMonth.getFullYear() - currMonth.getFullYear();
  const diffInMonths = newMonth.getMonth() - currMonth.getMonth();
  const totalMonths = diffInYears * 12 + diffInMonths;

  return totalMonths;
};

export const MonthScreen: React.FC<Props> = ({ route, navigation }) => {
  const { monthId, reset } = route.params;
  const pagerRef = React.useRef<InfinitePagerImperativeApi>(null);
  const index = useSharedValue(0);

  React.useEffect(() => {
    if (reset) {
      const idx = getIndexFromMonthId(monthId);
      pagerRef.current?.setPage(idx, { animated: false });
      navigation.setParams({ reset: false });
    }
  }, [monthId, reset]);

  return (
    <BaseScreen bg="mainBackground">
      <InfinitePager
        style={{ flex: 1 }}
        pageCallbackNode={index}
        onPageChange={(idx) => {
          navigation.setParams({ monthId: getMonthIdFromIndex(idx) });
        }}
        ref={pagerRef}
        pageBuffer={2}
        pageWrapperStyle={{ flex: 1 }}
        renderPage={({ index }) => {
          const monthId = getMonthIdFromIndex(index);

          return (
            <Container>
              <MonthScreenNavigation monthId={monthId} />
              <MonthCalendar monthId={monthId} />
            </Container>
          );
        }}
      />
    </BaseScreen>
  );
};
