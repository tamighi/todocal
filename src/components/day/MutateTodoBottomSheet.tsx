import React from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Keyboard, Pressable, TextInput } from "react-native";
import { Card, Text } from "@/atoms";
import { Todo } from "@/models";
import { useMutateTodo } from "@/hooks";

const MutateTodo = (props: {
  dayId: string;
  onMutate?: () => void;
  todo?: Todo;
}) => {
  const { dayId, onMutate, todo } = props;

  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(todo ? todo.content : "");
  }, [todo]);

  const onSuccess = () => {
    onMutate?.();
    setValue("");
  };

  const { mutate, deleteMutate } = useMutateTodo(dayId, { onSuccess });

  const handleSubmit = async () => {
    mutate({
      day: { id: dayId },
      content: value,
      id: todo ? todo.id : undefined,
    });
    Keyboard.dismiss();
  };

  const handleDelete = async () => {
    deleteMutate(todo!.id);
  };

  return (
    <Card width="100%" height="100%">
      <TextInput
        style={{ padding: 12, borderWidth: 1 }}
        value={value}
        onChangeText={setValue}
        placeholder="Todo"
      />
      {todo ? (
        <>
          <Pressable onPress={handleSubmit}>
            <Text>Update</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text>Delete</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleSubmit}>
          <Text>Create</Text>
        </Pressable>
      )}
    </Card>
  );
};

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
        <MutateTodo dayId={dayId} onMutate={onClose} todo={todo} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
