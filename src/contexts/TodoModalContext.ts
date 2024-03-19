import React from "react";

import { Todo } from "@/models";

export type TodoModalProps = {
  todo?: Todo;
  dayId?: string;
  open: boolean;
};

type TodoModalContextProps = React.Dispatch<
  React.SetStateAction<TodoModalProps>
>;

export const TodoModalContext =
  React.createContext<TodoModalContextProps | null>(null);

export const useTodoModal = () => {
  const todoContext = React.useContext(TodoModalContext);
  if (!todoContext) {
    throw new Error("Todo modal provider must be defined.");
  }

  return { setTodoModalProps: todoContext };
};
