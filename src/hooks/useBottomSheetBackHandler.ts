import BottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { BackHandler, NativeEventSubscription } from "react-native";

export const useBottomSheetBackHandler = (
  bottomSheetRef: React.RefObject<BottomSheet | null>,
) => {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
    null,
  );
  const handleSheetPositionChange = useCallback<
    NonNullable<BottomSheetProps["onChange"]>
  >(
    (index) => {
      const isBottomSheetVisible = index >= 0;
      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        // setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            bottomSheetRef.current?.close();
            return true;
          },
        );
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetRef, backHandlerSubscriptionRef],
  );
  return { handleSheetPositionChange };
};
