import React from "react";

import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler, useTheme } from "@/hooks";
import { Keyboard } from "react-native";

type BottomSheetProps = {
  open: boolean;
  onClose?: () => void;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
};

export const BottomSheet = (props: BottomSheetProps) => {
  const { open, onClose, snapPoints, children } = props;
  const { colors } = useTheme();

  const bottomSheetRef = React.useRef<RNBottomSheet>(null);
  const { handleSheetPositionChange } =
    useBottomSheetBackHandler(bottomSheetRef);

  React.useEffect(() => {
    if (open) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onAnimate = (_: number, to: number) => {
    if (to === -1) {
      Keyboard.dismiss();
      setTimeout(() => {
        bottomSheetRef.current?.close();
      }, 50);
    }
  };

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      onAnimate={onAnimate}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      onClose={onClose}
      backdropComponent={renderBackdrop}
      onChange={handleSheetPositionChange}
      handleStyle={{ backgroundColor: colors.mainBackground }}
      backgroundStyle={{ backgroundColor: colors.mainBackground }}
    >
      {open && children}
    </RNBottomSheet>
  );
};
