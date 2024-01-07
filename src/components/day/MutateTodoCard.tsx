import React from "react";

import { Box, Card, Text } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Tag, Todo } from "@/models";
import { Keyboard, Pressable, TextInput } from "react-native";
import { Checkbox } from "../Checkbox";
import { TagSelect } from "./TagSelect";
import { TodoMutate } from "@/models/Todo";

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

  const [formValue, setFormValue] = React.useState<TodoMutate>({});

  const handleInputChange = <T extends keyof TodoMutate>(
    name: T,
    value: TodoMutate[T],
  ) => {
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

  const handleTagChange = React.useCallback((tag: Tag | null) => {
    return handleInputChange("tag", tag ? tag : { id: null });
  }, []);

  return (
    <Card width="100%" height="100%">
      <Box zIndex={2} flexDirection="row" justifyContent="space-between">
        <TextInput
          style={{ padding: 12, margin: 2, borderWidth: 1, flex: 1 }}
          value={formValue.content}
          onChangeText={(value) => handleInputChange("content", value)}
          placeholder="Todo"
        />
        <TagSelect value={formValue.tag} onChange={handleTagChange} />
      </Box>
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
