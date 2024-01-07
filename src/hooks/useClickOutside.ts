import React from "react";

import {
  addClickOutsideListener,
  removeClickOutsideListener,
} from "@/contexts/ClickOutsideContext";
import { View } from "react-native";

const useClickOutside = <T = View>(callback: () => void) => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    addClickOutsideListener(ref, callback);
    return () => {
      removeClickOutsideListener(ref);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
