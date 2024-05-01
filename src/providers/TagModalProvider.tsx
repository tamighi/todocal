import React from "react";

import { TagModalContext, TagModalProps } from "@/contexts";
import { BottomSheet, MutateTagForm } from "@/components";

type ProviderProps = {
  children: React.ReactNode;
};

export const TagModalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [modalProps, setModalProps] = React.useState<TagModalProps>({
    open: false,
  });

  const { tag, open, onModalClose } = modalProps;

  const onClose = React.useCallback(() => {
    onModalClose?.();
    setModalProps((prev) => ({ ...prev, open: false }));
  }, [setModalProps]);

  return (
    <TagModalContext.Provider value={setModalProps}>
      {children}
      <BottomSheet open={open} onClose={onClose} snapPoints={[320]}>
        <MutateTagForm tag={tag} onMutate={onClose} />
      </BottomSheet>
    </TagModalContext.Provider>
  );
};
