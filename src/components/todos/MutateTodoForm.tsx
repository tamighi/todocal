import React from "react";

import { Box, Container } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Tag, Todo } from "@/models";
import {
  Checkbox,
  DatePicker,
  FormActionButtons,
  TextInput,
} from "@/components/core";
import { TagSelect } from "@/components/tags";
import { getDayIdFromDate } from "@/utils";

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

  const handleDateChange = (date: Date) => {
    const newDayId = getDayIdFromDate(date);
    setFormValue((prev) => ({ ...prev, day: { id: newDayId } }));
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
        <DatePicker
          value={new Date(formValue.day?.id || dayId)}
          onValueChange={handleDateChange}
        />
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
