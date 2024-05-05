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

  const isDay = React.useMemo(
    () => currentRoute?.name === "Day",
    [currentRoute],
  );

  const isCurrentMonth = React.useMemo(
    () =>
      currentRoute?.name === "Month" &&
      // @ts-ignore
      currentRoute?.params.monthId === getCurrentMonthId(),
    [currentRoute],
  );

  const navigateThisMonth = () => {
    navigation.navigate("Month", { monthId: getCurrentMonthId(), reset: true });
  };

  const navigateToMonth = () => {
    //@ts-ignore
    const dayId = currentRoute?.params.dayId;
    navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) });
  };

  const navigateToToday = () => {
    navigation.navigate("Day", { dayId: getCurrentDayId() });
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
          label="To month"
          paddingHorizontal="m"
          onPress={navigateToMonth}
        />
      ) : isCurrentMonth ? (
        <Button label="Today" paddingHorizontal="m" onPress={navigateToToday} />
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
