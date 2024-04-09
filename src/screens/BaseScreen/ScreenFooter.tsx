import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { getCurrentDayId, getCurrentMonthId } from "@/utils";
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

  const navigateToday = () => {
    navigation.navigate("Day", { dayId: getCurrentDayId() });
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
      marginHorizontal="xs"
    >
      {isCurrentMonth ? (
        <Button label="Today" onPress={navigateToday} />
      ) : (
        <Button label="Current month" onPress={navigateThisMonth} />
      )}
      <Button label="New todo" onPress={openNewTodoBottomSheet} />
    </Box>
  );
};
