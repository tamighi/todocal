import React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler, useTheme } from "@/hooks";

type BottomSheetProps = {
  open: boolean;
  onClose?: () => void;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
};

export const BottomSheet = (props: BottomSheetProps) => {
  const { open, onClose, snapPoints, children } = props;
  const { colors } = useTheme();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { handleSheetPositionChange } =
    useBottomSheetBackHandler(bottomSheetRef);

  React.useEffect(() => {
    if (open) {
      bottomSheetRef.current?.present();
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

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        onDismiss={onClose}
        backdropComponent={renderBackdrop}
        onChange={handleSheetPositionChange}
        handleStyle={{ backgroundColor: colors.mainBackground }}
        backgroundStyle={{ backgroundColor: colors.mainBackground }}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
