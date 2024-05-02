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
    () => navigation.getState().routes.at(-1)?.name === "Day",
    [navigation],
  );

  const navigateThisMonth = () => {
    navigation.navigate("Month", { monthId: getCurrentMonthId(), reset: true });
  };

  const navigateToMonth = () => {
    //@ts-ignore
    const dayId = navigation.getState().routes.at(-1).params.dayId;
    navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) });
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
