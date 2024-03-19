import React from "react";

import { UndoToast } from "@/components/core/UndoToast";
import { UndoToastContext, UndoToastProps } from "@/contexts";

export const UndoToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastProps, setToastProps] = React.useState<UndoToastProps>({
    show: false,
  });

  const close = () => setToastProps((prev) => ({ ...prev, show: false }));

  return (
    <UndoToastContext.Provider value={setToastProps}>
      {children}
      <UndoToast {...toastProps} close={close} />
    </UndoToastContext.Provider>
  );
};
