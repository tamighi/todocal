import React from "react";

import { TagModalListContext } from "@/contexts";
import { TagListModal } from "@/components";

type ProviderProps = {
  children: React.ReactNode;
};

export const TagListModalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [visible, setVisible] = React.useState(false);

  const onClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  const open = () => {
    setVisible(true);
  };

  return (
    <TagModalListContext.Provider value={open}>
      {children}
      <TagListModal visible={visible} onRequestClose={onClose} />
    </TagModalListContext.Provider>
  );
};
