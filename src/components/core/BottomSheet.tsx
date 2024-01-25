import React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export const BottomSheet = (props: BottomSheetProps) => {
  const { open, onClose, children } = props;
  // ref
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ["70%"], []);

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
        detached={true}
        backdropComponent={renderBackdrop}
        onDismiss={onClose}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
