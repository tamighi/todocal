import React from "react";

import { Todo } from "@/models";
import { getDefaultDayId } from "@/utils";
import { MutateTodoForm } from "@/components/todos";
import { BottomSheet } from "@/components/core";

type TodoModalProps = {
  todo?: Todo;
  dayId?: string;
  open: boolean;
};

const TodoModalContext = React.createContext<React.Dispatch<
  React.SetStateAction<TodoModalProps>
> | null>(null);

export const useTodoModal = () => {
  const todoContext = React.useContext(TodoModalContext);
  if (!todoContext) {
    throw new Error("Todo modal provider must be defined.");
  }

  return { setTodoModalProps: todoContext };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const TodoModalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [modalProps, setModalProps] = React.useState<TodoModalProps>({
    open: false,
  });

  const { dayId = getDefaultDayId(), todo, open } = modalProps;

  const onClose = React.useCallback(() => {
    setModalProps({ ...modalProps, open: false });
  }, []);

  return (
    <TodoModalContext.Provider value={setModalProps}>
      {children}
      <BottomSheet open={open} onClose={onClose} sheetHeight="60%">
        <MutateTodoForm dayId={dayId} todo={todo} onMutate={onClose} />
      </BottomSheet>
    </TodoModalContext.Provider>
  );
};
