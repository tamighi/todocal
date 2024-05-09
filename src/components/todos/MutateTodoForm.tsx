import React from "react";

import { Box, Container } from "@/atoms";
import { Tag, Todo } from "@/models";
import {
  Checkbox,
  DatePicker,
  FormActionButtons,
  IconButton,
  RRulePicker,
  TextInput,
} from "@/components/core";
import { TagSelect } from "@/components/tags";
import { getDayIdFromDate } from "@/utils";
import { useCreateTodo, useDeleteOneTodo, useUpdateTodo } from "@/hooks";

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
  const { mutate: deleteMutate } = useDeleteOneTodo();

  const handleSubmit = async () => {
    if (!formValue?.content) return;

    if (todo?.id) {
      updateMutate({ ...(formValue as Todo), oldDayId: dayId });
    } else {
      createMutate({ ...formValue, day: { id: formValue.day?.id || dayId } });
    }
  };

  const handleDelete = async () => {
    deleteMutate(formValue as Todo);
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
    date.setDate(date.getUTCDate() - 1);
    handleDateChange(date);
  };

  const handlePlusPress = () => {
    const date = new Date(formValue.day?.id || dayId);
    date.setUTCDate(date.getUTCDate() + 1);
    handleDateChange(date);
  };

  return (
    <Container marginHorizontal="s" gap="m">
      <TextInput
        autoFocus
        value={formValue.content}
        onChangeText={(value) => handleInputChange("content", value)}
        placeholder="Todo"
        showClearButton={true}
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
      <Box flexDirection="row" justifyContent="space-around" mb="l">
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
        <Box zIndex={2} alignItems="center" flexDirection="row">
          <RRulePicker />
          {/* <IconButton name="minus" onPress={handleMinusPress} /> */}
          {/* <DatePicker */}
          {/*   value={new Date(formValue.day?.id || dayId)} */}
          {/*   onValueChange={handleDateChange} */}
          {/* /> */}
          {/* <IconButton name="plus" onPress={handlePlusPress} /> */}
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
