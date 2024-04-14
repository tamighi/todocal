import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeSyntheticEvent } from "react-native";
import PagerView from "react-native-pager-view";

import { RootStackParamList } from "@/Navs";
import { DayCard } from "@/components";
import { getNextDayId, getPrevDayId } from "@/utils";
import { Box } from "@/atoms";

import { BaseScreen } from "../BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

export const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const [dayArray, setDayArray] = React.useState([
    getPrevDayId(dayId),
    dayId,
    getNextDayId(dayId),
  ]);

  const onPageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>,
  ) => {
    if (e.nativeEvent.position <= 1) {
      setDayArray((prev) => [getPrevDayId(prev[0]), ...prev].slice(0, 5));
    }

    if (e.nativeEvent.position >= dayArray.length - 2) {
      setDayArray((prev) =>
        [...prev, getNextDayId(prev.at(-1) as string)].slice(-5),
      );
    }
  };

  return (
    <BaseScreen>
      <PagerView
        style={{ flex: 1 }}
        onPageSelected={onPageSelected}
        initialPage={1}
      >
        {dayArray.map((dayId) => (
          <Box marginHorizontal="l" key={dayId}>
            <DayCard dayId={dayId} />
          </Box>
        ))}
      </PagerView>
    </BaseScreen>
  );
};
