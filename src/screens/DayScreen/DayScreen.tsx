import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { DayCard } from "@/components";

import { BaseScreen } from "../BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

export const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  return (
    <BaseScreen marginHorizontal="l">
      <DayCard dayId={dayId} />
    </BaseScreen>
  );
};
