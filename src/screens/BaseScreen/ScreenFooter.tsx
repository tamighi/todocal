import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import {
  getCurrentDayId,
  getCurrentMonthId,
  getMonthIdFromDayId,
} from "@/utils";
import { Button } from "@/components";
import { useTodoModal } from "@/contexts";

export const ScreenFooter = () => {
  const navigation = useNavigation();
  const currentRoute = navigation.getState().routes.at(-1);

  const { setTodoModalProps } = useTodoModal();

  const isCurrentMonth = React.useMemo(
    () =>
      currentRoute?.name === "Month" &&
      //@ts-ignore
      currentRoute.params?.monthId === getCurrentMonthId(),
    [currentRoute],
  );

  const isDay = React.useMemo(() => currentRoute?.name === "Day", []);

  const navigateToday = () => {
    navigation.navigate("Day", { dayId: getCurrentDayId() });
  };

  const navigateToMonth = (dayId: string) => {
    navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) });
  };

  const navigateThisMonth = () => {
    navigation.navigate("Month", { monthId: getCurrentMonthId() });
  };

  const openNewTodoBottomSheet = () => {
    const dayId =
      currentRoute?.name === "Day"
        ? // @ts-ignore
          currentRoute.params?.dayId
        : getCurrentDayId();

    setTodoModalProps({ open: true, dayId });
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      bg="mainBackground"
      marginHorizontal="s"
      marginVertical="xs"
    >
      {isDay ? (
        <Button
          label="Month view"
          paddingHorizontal="m"
          //@ts-ignore
          onPress={() => navigateToMonth(currentRoute?.params?.dayId)}
        />
      ) : isCurrentMonth ? (
        <Button label="Today" paddingHorizontal="m" onPress={navigateToday} />
      ) : (
        <Button
          label="Current month"
          paddingHorizontal="m"
          onPress={navigateThisMonth}
        />
      )}
      <Button
        label="New todo"
        paddingHorizontal="m"
        onPress={openNewTodoBottomSheet}
      />
    </Box>
  );
};
