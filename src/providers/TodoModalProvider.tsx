import React from "react";

import { BottomSheet, MutateTodoForm } from "@/components";
import { TodoModalContext, TodoModalProps } from "@/contexts";
import { getCurrentDayId } from "@/utils";

type ProviderProps = {
  children: React.ReactNode;
};

export const TodoModalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [modalProps, setModalProps] = React.useState<TodoModalProps>({
    open: false,
  });

  const { dayId = getCurrentDayId(), todo, open } = modalProps;

  const onClose = React.useCallback(() => {
    setModalProps({ ...modalProps, open: false });
  }, []);

  return (
    <TodoModalContext.Provider value={setModalProps}>
      {children}
      <BottomSheet open={open} onClose={onClose} snapPoints={[360]}>
        <MutateTodoForm dayId={dayId} todo={todo} onMutate={onClose} />
      </BottomSheet>
    </TodoModalContext.Provider>
  );
};
