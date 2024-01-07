import React from "react";

import {
  addClickOutsideListener,
  removeClickOutsideListener,
} from "@/contexts/ClickOutsideContext";
import { View } from "react-native";

const useClickOutside = <T = View>(callback: () => void) => {
  const callbackRef = React.useRef(callback);
  const ref = React.useRef<T>(null);
  const callbackRegisterWrapper = () => callbackRef.current();

  React.useEffect(() => {
    addClickOutsideListener(ref, callbackRegisterWrapper);
    return () => {
      removeClickOutsideListener(ref);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
