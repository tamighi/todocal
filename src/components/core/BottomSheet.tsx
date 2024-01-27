import React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/hooks";
import { ScrollView } from "react-native";

type BottomSheetProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export const BottomSheet = (props: BottomSheetProps) => {
  const { open, onClose, children } = props;
  const { colors } = useTheme();
  // ref
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ["30%"], []);

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
        backdropComponent={renderBackdrop}
        onDismiss={onClose}
        handleStyle={{ backgroundColor: colors.mainBackground }}
        backgroundStyle={{ backgroundColor: colors.mainBackground }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
