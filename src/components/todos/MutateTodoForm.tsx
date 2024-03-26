import React from "react";

import { Box, Container } from "@/atoms";
import { Tag, Todo } from "@/models";
import {
  Checkbox,
  DatePicker,
  FormActionButtons,
  IconButton,
  TextInput,
} from "@/components/core";
import { TagSelect } from "@/components/tags";
import { getDayIdFromDate } from "@/utils";
import { useCreateTodo, useDeleteOne, useUpdateTodo } from "@/hooks";

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

  const { mutate: createMutate } = useCreateTodo({ onSuccess });
  const { mutate: updateMutate } = useUpdateTodo({ onSuccess });
  const { mutate: deleteMutate } = useDeleteOne("todo");

  const handleSubmit = async () => {
    if (todo?.id) {
      updateMutate(formValue as Todo);
    } else {
      createMutate({ ...formValue, day: { id: dayId } });
    }
  };

  const handleDelete = async () => {
    deleteMutate(todo!.id);
    onSuccess?.();
  };

  const handleTagChange = React.useCallback((tag: Tag | null) => {
    return handleInputChange("tag", tag);
  }, []);

  const handleDateChange = (date: Date) => {
    const newDayId = getDayIdFromDate(date);
    setFormValue((prev) => ({ ...prev, day: { id: newDayId } }));
  };

  const handleMinusPress = () => {
    const date = new Date(formValue.day?.id || dayId);
    date.setDate(date.getDate() - 1);
    handleDateChange(date);
  };

  const handlePlusPress = () => {
    const date = new Date(formValue.day?.id || dayId);
    date.setDate(date.getDate() + 1);
    handleDateChange(date);
  };

  return (
    <Container marginHorizontal="s" gap="m">
      <TextInput
        autoFocus
        value={formValue.content}
        onChangeText={(value) => handleInputChange("content", value)}
        placeholder="Todo"
      />
      <TagSelect
        value={formValue.tag || undefined}
        onChange={handleTagChange}
      />

      <TextInput
        value={formValue.description}
        onChangeText={(value) => handleInputChange("description", value)}
        placeholder="Description (optional)"
        textAlignVertical="top"
        textArea
      />
      <Box flexDirection="row" justifyContent="space-around" mb="lg">
        <Box flexDirection="column" alignItems="flex-end" gap="s">
          <Checkbox
            label="Urgent"
            onPress={(value) => handleInputChange("urgent", value)}
            checked={formValue.urgent || false}
          />
          <Checkbox
            label="Important"
            onPress={(value) => handleInputChange("important", value)}
            checked={formValue.important || false}
          />
        </Box>
        <Box alignItems="center" flexDirection="row">
          <IconButton name="minus" onPress={handleMinusPress} />
          <DatePicker
            value={new Date(formValue.day?.id || dayId)}
            onValueChange={handleDateChange}
          />
          <IconButton name="plus" onPress={handlePlusPress} />
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
