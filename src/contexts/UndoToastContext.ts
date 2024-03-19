import React from "react";

import { UndoToastProps as NUndoToastProps } from "@/components";

export const useUndoToast = () => {
  const setToastProps = React.useContext(UndoToastContext);

  if (!setToastProps) throw new Error("Must provide showToast context");

  const show = (props: Omit<UndoToastProps, "show">) => {
    setToastProps({ ...props, show: true });
  };

  return { show };
};

export type UndoToastProps = Omit<NUndoToastProps, "close">;

export type UndoToastContextProps = React.Dispatch<
  React.SetStateAction<UndoToastProps>
>;

export const UndoToastContext =
  React.createContext<UndoToastContextProps | null>(null);
