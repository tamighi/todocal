import React from "react";
import { UndoToastContext } from "@/contexts";
import { UndoToast, UndoToastProps } from "@/components";

export const showUndoToast = (props: Omit<UndoToastProps, "show">) => {
  const setToastProps = React.useContext(UndoToastContext);

  if (!setToastProps) throw new Error("Must provide showToast context");

  setToastProps({ ...props, show: true });
};

export const UndoToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastProps, setToastProps] = React.useState<UndoToastProps>({
    show: false,
  });

  return (
    <UndoToastContext.Provider value={setToastProps}>
      {children}
      {toastProps.message && <UndoToast {...toastProps} />}
    </UndoToastContext.Provider>
  );
};
