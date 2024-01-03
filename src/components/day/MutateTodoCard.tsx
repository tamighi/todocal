import React from "react";

import { Card, Text, TextInput } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Todo } from "@/models";
import { Keyboard, Pressable } from "react-native";

export const MutateTodoCard = (props: {
  dayId: string;
  onMutate?: () => void;
  todo?: Todo;
}) => {
  const { dayId, onMutate, todo } = props;

  const [formValue, setFormValue] = React.useState<Partial<Todo>>({
    content: "",
    urgent: false,
    important: false,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    setFormValue(todo || {});
  }, [todo]);

  // Mutate logic

  const onSuccess = () => {
    onMutate?.();
    setFormValue({});
  };

  const { mutate, deleteMutate } = useMutateTodo(dayId, { onSuccess });

  const handleSubmit = async () => {
    mutate({
      day: { id: dayId },
      id: todo ? todo.id : undefined,
      ...formValue,
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
        name="content"
        value={formValue.content}
        onChangeText={handleInputChange}
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
