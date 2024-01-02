import React from "react";

import { Card, Text } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Todo } from "@/models";
import { Keyboard, Pressable, TextInput } from "react-native";

export const MutateTodoCard = (props: {
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
