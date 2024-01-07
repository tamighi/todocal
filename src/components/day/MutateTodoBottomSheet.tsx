import React from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { Todo } from "@/models";
import { MutateTodoCard } from "./MutateTodoCard";

export const MutateTodoBottomSheet = (props: {
  open: boolean;
  dayId: string;
  onClose?: () => void;
  todo?: Todo;
}) => {
  const { open, dayId, onClose, todo } = props;
  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["70%"], []);

  React.useEffect(() => {
    if (open) {
      bottomSheetRef.current?.snapToIndex(0);
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
      index={0}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      detached={true}
      backdropComponent={renderBackdrop}
      onClose={onClose}
    >
      <MutateTodoCard dayId={dayId} onMutate={onClose} todo={todo} />
    </BottomSheet>
  );
};
