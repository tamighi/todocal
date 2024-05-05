import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ViewToken } from "react-native";

import { RootStackParamList } from "@/Navs";
import { DayCard, InfiniteFlatList } from "@/components";
import { getDayIdFromDate } from "@/utils";
import { Container } from "@/atoms";

import { BaseScreen } from "../BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const getDayIdFromIndex = (idx: number, baseDayId: string) => {
  const currentDay = new Date(baseDayId);
  currentDay.setDate(currentDay.getDate() + idx);

  return getDayIdFromDate(currentDay);
};

export const DayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { dayId } = route.params;

  const staticDayId = React.useMemo(() => dayId, []);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length === 1) {
        navigation.setParams({
          dayId: getDayIdFromIndex(viewableItems[0].item, staticDayId),
        });
      }
    },
    [],
  );

  return (
    <BaseScreen>
      <InfiniteFlatList
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={(index) => {
          return (
            <Container style={{ backgroundColor: "#0005" }}>
              <Pressable
                onPress={navigation.goBack}
                style={{ flex: 1, paddingHorizontal: 48, paddingVertical: 24 }}
              >
                <Pressable style={{ flex: 1 }}>
                  <DayCard dayId={getDayIdFromIndex(index, staticDayId)} />
                </Pressable>
              </Pressable>
            </Container>
          );
        }}
      />
    </BaseScreen>
  );
};
