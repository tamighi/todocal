import React from "react";

import { Box, Card, Text } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Todo } from "@/models";
import { Keyboard, Pressable, TextInput } from "react-native";
import { Checkbox } from "../Checkbox";

export const MutateTodoCard = (props: {
  dayId: string;
  onMutate?: () => void;
  todo?: Todo;
}) => {
  const { dayId, onMutate, todo } = props;

  React.useEffect(() => {
    setFormValue(todo || {});
  }, [todo]);

  // Form logic

  const [formValue, setFormValue] = React.useState<Partial<Todo>>({});

  const handleInputChange = <T extends keyof Todo>(name: T, value: Todo[T]) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

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
        value={formValue.content}
        onChangeText={(value) => handleInputChange("content", value)}
        placeholder="Todo"
      />
      <Box flexDirection="row" justifyContent="space-around">
        <Box>
          <Text>Urgent</Text>
          <Checkbox
            onPress={(value) => handleInputChange("urgent", value)}
            checked={formValue.urgent || false}
          />
        </Box>
        <Box>
          <Text>Important</Text>
          <Checkbox
            onPress={(value) => handleInputChange("important", value)}
            checked={formValue.important || false}
          />
        </Box>
      </Box>

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
