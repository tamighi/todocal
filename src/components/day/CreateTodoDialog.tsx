import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import { Pressable, TextInput } from "react-native";
import { Card, Text } from "@/atoms";
import { useCreateTodo } from "@/hooks/useCreateTodo";

const CreateTodo = (props: { dayId: string }) => {
  const [value, setValue] = React.useState("");

  const { mutate } = useCreateTodo();

  const create = async () => {
    await mutate(props.dayId, { content: value });
  };

  return (
    <Card width="100%" height="100%">
      <TextInput
        style={{ padding: 12, borderWidth: 1 }}
        value={value}
        onChangeText={setValue}
        placeholder="Todo"
      />
      <Pressable onPress={create}>
        <Text>Create</Text>
      </Pressable>
    </Card>
  );
};

export const CreateTodoBottomSheet = (props: {
  open: boolean;
  dayId: string;
}) => {
  const { open, dayId } = props;
  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["50%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={open ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      detached={true}
      bottomInset={-46}
    >
      <CreateTodo dayId={dayId} />
    </BottomSheet>
  );
};
