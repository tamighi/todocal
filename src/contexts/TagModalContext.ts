import React from "react";

import { Tag } from "@/models";

export type TagModalProps = {
  tag?: Tag;
  open: boolean;
};

type TagModalContextProps = React.Dispatch<React.SetStateAction<TagModalProps>>;

export const TagModalContext = React.createContext<TagModalContextProps | null>(
  null,
);

export const useTagModal = () => {
  const tagContext = React.useContext(TagModalContext);
  if (!tagContext) {
    throw new Error("Tag modal provider must be defined.");
  }

  return { setTagModalProps: tagContext };
};
