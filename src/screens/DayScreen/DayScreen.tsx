import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InfinitePager from "react-native-infinite-pager";

import { RootStackParamList } from "@/Navs";
import { DayCard } from "@/components";
import { getDayIdFromDate } from "@/utils";

import { BaseScreen } from "../BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const getDayIdFromIndex = (idx: number, baseDayId: string) => {
  const currentDay = new Date(baseDayId);
  currentDay.setDate(currentDay.getDate() + idx);

  return getDayIdFromDate(currentDay);
};

export const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  return (
    <BaseScreen>
      <InfinitePager
        style={{ flex: 1 }}
        pageBuffer={2}
        pageWrapperStyle={{ flex: 1 }}
        PageComponent={({ index }) => {
          return (
            <DayCard
              marginHorizontal="l"
              dayId={getDayIdFromIndex(index, dayId)}
            />
          );
        }}
      />
    </BaseScreen>
  );
};
