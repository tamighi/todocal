import React from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { Tag } from "@/models";
import { MutateTagCard } from "./MutateTagForm";

export const MutateTagBottomSheet = (props: {
  open: boolean;
  tag?: Tag;
  onClose?: () => void;
}) => {
  const { open, onClose, tag } = props;
  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["70%"], []);

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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      detached={true}
      backdropComponent={renderBackdrop}
      onClose={onClose}
    >
      <MutateTagCard onMutate={onClose} tag={tag} />
    </BottomSheet>
  );
};
