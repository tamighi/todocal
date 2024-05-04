import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Pressable } from "react-native";

import { useTheme } from "@/hooks";
import { RootStackParamList } from "@/Navs";
import { DayCard, InfiniteFlatList } from "@/components";
import { getDayIdFromDate } from "@/utils";

import { BaseScreen } from "../BaseScreen";

const WIDTH = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const getDayIdFromIndex = (idx: number, baseDayId: string) => {
  const currentDay = new Date(baseDayId);
  currentDay.setDate(currentDay.getDate() + idx);

  return getDayIdFromDate(currentDay);
};

export const DayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { dayId } = route.params;
  const theme = useTheme();

  return (
    <BaseScreen>
      <InfiniteFlatList
        renderItem={(index) => {
          return (
            <Pressable
              style={{ backgroundColor: "#0005", width: WIDTH }}
              onPress={navigation.goBack}
            >
              <Pressable style={{ flex: 1, margin: theme.spacing.l }}>
                <DayCard dayId={getDayIdFromIndex(index, dayId)} />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </BaseScreen>
  );
};
