import React from "react";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
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
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ["50%"], []);

  React.useEffect(() => {
    if (open) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  const handleModalChange = (index: number) => {
    if (index === -1) onClose?.();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleModalChange}
      >
        <MutateTodoCard dayId={dayId} onMutate={onClose} todo={todo} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
