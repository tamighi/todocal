import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Pressable } from "react-native";

import { RootStackParamList } from "@/Navs";
import { DayCard, InfiniteFlatList } from "@/components";
import { getDayIdFromDate } from "@/utils";
import { Container } from "@/atoms";

import { BaseScreen } from "../BaseScreen";

const WIDTH = Dimensions.get("window").width;

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
      <InfiniteFlatList
        itemWidth={WIDTH - 70}
        itemOffset={36}
        renderItem={(index) => {
          return (
            <Container width={WIDTH - 70} style={{ backgroundColor: "#0005" }}>
              <Pressable style={{ flex: 1, padding: 24 }}>
                <DayCard dayId={getDayIdFromIndex(index, dayId)} />
              </Pressable>
            </Container>
          );
        }}
      />
    </BaseScreen>
  );
};
