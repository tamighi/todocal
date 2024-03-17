import React from "react";

import { UndoToast } from "@/components/core/UndoToast";
import { UndoToastContext, UndoToastProps } from "@/contexts";

export const useUndoToast = () => {
  const setToastProps = React.useContext(UndoToastContext);

  if (!setToastProps) throw new Error("Must provide showToast context");

  const show = (props: Omit<UndoToastProps, "show">) => {
    setToastProps({ ...props, show: true });
  };

  return { show };
};

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
