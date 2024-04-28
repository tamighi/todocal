import React from "react";

type TagModalContextProps = () => void;

export const TagModalListContext =
  React.createContext<TagModalContextProps | null>(null);

export const useTagListModal = () => {
  const tagContext = React.useContext(TagModalListContext);
  if (!tagContext) {
    throw new Error("Tag modal provider must be defined.");
  }

  return { open: tagContext };
};
