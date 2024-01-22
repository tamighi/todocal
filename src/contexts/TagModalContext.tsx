import React from "react";

import { Keyboard } from "react-native";

import { Tag } from "@/models";
import { MutateTagBottomSheet } from "@/components/tags";

type TagModalProps = {
  tag?: Tag;
  onClose?: () => void;
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
    modalProps.onClose?.();
    Keyboard.dismiss();
  }, []);

  return (
    <TagModalContext.Provider value={setModalProps}>
      {children}
      <MutateTagBottomSheet tag={tag} open={open} onClose={onClose} />
    </TagModalContext.Provider>
  );
};
