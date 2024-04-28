import React from "react";

import { TagModalContext, TagModalProps } from "@/contexts";
import { BottomSheet, MutateTagForm } from "@/components";

type ProviderProps = {
  children: React.ReactNode;
};

export const TagListModalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [modalProps, setModalProps] = React.useState<TagModalProps>({
    open: false,
  });

  const { tag, open } = modalProps;

  const onClose = React.useCallback(() => {
    setModalProps({ ...modalProps, open: false });
  }, []);

  return (
    <TagModalContext.Provider value={setModalProps}>
      {children}
      <BottomSheet open={open} onClose={onClose} snapPoints={[320]}>
        <MutateTagForm tag={tag} onMutate={onClose} />
      </BottomSheet>
    </TagModalContext.Provider>
  );
};
