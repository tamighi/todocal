import React from "react";

import { Box } from "@/atoms";
import { useNavigation } from "@/hooks";
import { getCurrentDayId, getCurrentMonthId } from "@/utils";
import { Button } from "@/components";
import { useTodoModal } from "@/contexts";

export const ScreenFooter = () => {
  const navigation = useNavigation();

  const { setTodoModalProps } = useTodoModal();

  const navigateToday = () => {
    navigation.navigate("Month", { monthId: getCurrentMonthId() });
  };

  const openNewTodoBottomSheet = () => {
    setTodoModalProps({ open: true, dayId: getCurrentDayId() });
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      bg="mainBackground"
      marginHorizontal="xs"
    >
      <Button label="Today" onPress={navigateToday} />
      <Button label="New todo" onPress={openNewTodoBottomSheet} />
    </Box>
  );
};
