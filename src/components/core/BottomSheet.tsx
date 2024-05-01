import React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler, useTheme } from "@/hooks";
import { Keyboard, Platform } from "react-native";

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
      if (Platform.OS === "ios") Keyboard.dismiss();
    }
  }, [open]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => Platform.OS === "ios" && Keyboard.dismiss()}
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
        snapPoints={snapPoints}
        onDismiss={onClose}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustPan"
        backdropComponent={renderBackdrop}
        onChange={handleSheetPositionChange}
        handleStyle={{ backgroundColor: colors.mainBackground }}
        backgroundStyle={{ backgroundColor: colors.mainBackground }}
        handleIndicatorStyle={{ backgroundColor: colors.mainForeground }}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
