import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Keyboard, Pressable, TextInput } from "react-native";

import { Card, Text } from "@/atoms";
import { useDeleteOne, useMutate } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getMonthIdFromDayId } from "@/utils";
import { Todo } from "@/models";

const MutateTodo = (props: {
  dayId: string;
  onMutate: () => void;
  todo: Todo | null;
}) => {
  const { dayId, onMutate, todo } = props;

  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(todo ? todo.content : "");
  }, [todo]);

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["day", dayId] });
    queryClient.invalidateQueries({
      queryKey: ["month", getMonthIdFromDayId(dayId)],
    });
    onMutate();
    setValue("");
  };

  const { mutate } = useMutate("todo", { onSuccess });

  const handleSubmit = async () => {
    mutate({
      day: { id: dayId },
      content: value,
      id: todo ? todo.id : undefined,
    });
    Keyboard.dismiss();
  };

  const { mutate: deleteMutate } = useDeleteOne("todo", { onSuccess });

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
  onClose: () => void;
  todo: Todo | null;
}) => {
  const { open, dayId, onClose, todo } = props;
  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["50%"], []);

  React.useEffect(() => {
    if (!open) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [open]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      detached={true}
      bottomInset={-46}
    >
      <MutateTodo dayId={dayId} onMutate={onClose} todo={todo} />
    </BottomSheet>
  );
};
