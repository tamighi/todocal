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

  React.useEffect(() => {
    if (reset) {
      const idx = getIndexFromMonthId(monthId);
      navigation.setParams({ monthId, reset: false });
      pagerRef.current?.setPage(idx, { animated: false });
    }
  }, [monthId, reset]);

  const handlePageChange = (idx: number) => {
    navigation.setParams({ monthId: getMonthIdFromIndex(idx) });
  };

  return (
    <BaseScreen>
      <InfinitePager
        style={{ flex: 1 }}
        ref={pagerRef}
        onPageChange={handlePageChange}
        pageWrapperStyle={{ flex: 1 }}
        PageComponent={({ index }) => {
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
