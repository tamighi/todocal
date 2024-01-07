import React from "react";

import { MutateTodoBottomSheet } from "@/components/day/MutateTodoBottomSheet";
import { Todo } from "@/models";

type TodoModalProps = {
  todo?: Todo;
  onClose?: () => void;
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

  const { dayId, todo, open } = modalProps;

  const onClose = React.useCallback(() => {
    setModalProps({ ...modalProps, open: false });
    modalProps.onClose?.();
  }, []);

  return (
    <TodoModalContext.Provider value={setModalProps}>
      {children}
      {dayId && (
        <MutateTodoBottomSheet
          dayId={dayId}
          todo={todo}
          open={open}
          onClose={onClose}
        />
      )}
    </TodoModalContext.Provider>
  );
};
