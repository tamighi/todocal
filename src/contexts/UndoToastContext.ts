import React from "react";

import { UndoToastProps as NUndoToastProps } from "@/components";

export type UndoToastProps = Omit<NUndoToastProps, "close">;

export type UndoToastContextProps = React.Dispatch<
  React.SetStateAction<UndoToastProps>
>;

export const UndoToastContext =
  React.createContext<UndoToastContextProps | null>(null);
