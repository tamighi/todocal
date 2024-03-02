import React from "react";

import { UndoToastProps } from "@/components";

type UndoToastContextProps = React.Dispatch<
  React.SetStateAction<UndoToastProps>
>;

export const UndoToastContext =
  React.createContext<UndoToastContextProps | null>(null);
