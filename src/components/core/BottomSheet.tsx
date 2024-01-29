import React from "react";

import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler, useTheme } from "@/hooks";
import { Keyboard, Platform, ScrollView } from "react-native";

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
      Keyboard.dismiss();
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
    <RNBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
      android_keyboardInputMode="adjustResize"
      onClose={onClose}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onChange={handleSheetPositionChange}
      handleStyle={{ backgroundColor: colors.mainBackground }}
      backgroundStyle={{ backgroundColor: colors.mainBackground }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </RNBottomSheet>
  );
};
