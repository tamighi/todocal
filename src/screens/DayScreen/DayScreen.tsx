import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/Navs";
import { DayCard } from "@/components";
import { useGetOneOrCreateDay } from "@/hooks";
import { useTodoFilters } from "@/contexts";
import { filterTodos } from "@/utils";

import { BaseScreen } from "../BaseScreen";
import { DayScreenFooterButtons } from "./DayScreenFooterButtons";

type Props = NativeStackScreenProps<RootStackParamList, "Day">;

export const DayScreen: React.FC<Props> = ({ route }) => {
  const { dayId } = route.params;

  const { data: day } = useGetOneOrCreateDay(dayId);
  const { filters } = useTodoFilters();

  return (
    <BaseScreen marginHorizontal="lg">
      <DayCard
        dayId={dayId}
        todos={filterTodos(day?.todos || [], "day", filters)}
        style={{ paddingBottom: 100 }}
      />
      <DayScreenFooterButtons dayId={dayId} />
    </BaseScreen>
  );
};
