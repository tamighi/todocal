import React from "react";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { Box, Container, Text } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Tag, Todo } from "@/models";
import { Checkbox, FormActionButtons } from "@/components/core";
import { TagSelect } from "@/components/tags";

export const MutateTodoForm = (props: {
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
      ...formValue,
    });
  };

  const handleDelete = async () => {
    deleteMutate(todo!.id);
  };

  const handleTagChange = React.useCallback((tag: Tag | null) => {
    return handleInputChange("tag", tag);
  }, []);

  return (
    <Container gap="lg">
      <Box zIndex={2} flexDirection="row" justifyContent="space-between">
        <BottomSheetTextInput
          style={{ padding: 12, margin: 2, borderWidth: 1, flex: 1 }}
          value={formValue.content}
          onChangeText={(value) => handleInputChange("content", value)}
          placeholder="Todo"
        />
        <TagSelect
          value={formValue.tag || undefined}
          onChange={handleTagChange}
        />
      </Box>

      <Box flexDirection="row" justifyContent="space-around">
        <Box flexDirection="row" gap="s" alignItems="center">
          <Text>Urgent</Text>
          <Checkbox
            onPress={(value) => handleInputChange("urgent", value)}
            checked={formValue.urgent || false}
          />
        </Box>
        <Box flexDirection="row" gap="s" alignItems="center">
          <Text>Important</Text>
          <Checkbox
            onPress={(value) => handleInputChange("important", value)}
            checked={formValue.important || false}
          />
        </Box>
      </Box>

      <FormActionButtons
        marginTop="s"
        mode={todo ? "update" : "create"}
        onCreateClick={handleSubmit}
        onEditClick={handleSubmit}
        onDeleteClick={handleDelete}
      />
    </Container>
  );
};
