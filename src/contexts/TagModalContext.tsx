import React from "react";

import { Tag } from "@/models";
import { BottomSheet } from "@/components/core";
import { MutateTagForm } from "@/components/tags";

type TagModalProps = {
  tag?: Tag;
  open: boolean;
};

const TagModalContext = React.createContext<React.Dispatch<
  React.SetStateAction<TagModalProps>
> | null>(null);

export const useTagModal = () => {
  const tagContext = React.useContext(TagModalContext);
  if (!tagContext) {
    throw new Error("Tag modal provider must be defined.");
  }

  return { setTagModalProps: tagContext };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const TagModalProvider = (props: ProviderProps) => {
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
      <BottomSheet open={open} onClose={onClose} sheetHeight="50%">
        <MutateTagForm tag={tag} onMutate={onClose} />
      </BottomSheet>
    </TagModalContext.Provider>
  );
};
