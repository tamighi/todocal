import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { Text } from "@/atoms";
import { DayCard, DayHeader } from "@/components";
import { useGetOne } from "@/hooks";

import { BaseScreen } from "./BaseScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const { data: day } = useGetOne("day", dayId);

  return (
    <BaseScreen marginHorizontal="xl">
      <DayHeader dayId={dayId} />
      {day ? <DayCard day={day} /> : <Text>Loading ...</Text>}
    </BaseScreen>
  );
};

export default DayScreen;
