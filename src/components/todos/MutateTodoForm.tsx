import React from "react";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";

import { Box, Button, Container, Text } from "@/atoms";
import { useMutateTodo } from "@/hooks";
import { Tag, Todo } from "@/models";
import { Checkbox, FormActionButtons } from "@/components/core";
import { TagSelect } from "@/components/tags";
import { Platform } from "react-native";
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

  // Date picker
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (!date || event.type === "dismissed") return;

    const newDayId = getDayIdFromDate(date);
    setFormValue((prev) => ({ ...prev, day: { id: newDayId } }));
  };

  return (
    <Container gap="lg">
      <Box zIndex={2} flexDirection="row" justifyContent="space-between">
        <BottomSheetTextInput
          style={{ padding: 12, marginHorizontal: 4, borderWidth: 1, flex: 1 }}
          autoFocus
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

      <Box
        marginHorizontal="xs"
        flexDirection="row"
        justifyContent="space-around"
      >
        <BottomSheetTextInput
          style={{ padding: 12, borderWidth: 1, flex: 2 }}
          value={formValue.description}
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Description (optional)"
        />
        {(showDatePicker || Platform.OS === "ios") && (
          <DateTimePicker
            value={new Date(dayId)}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={(e, d) => handleDateChange(e, d)}
          />
        )}

        {Platform.OS !== "ios" && (
          <Box
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="icon" onPress={() => setShowDatePicker(true)}>
              <Feather name="calendar" size={24} />
            </Button>
            <Text>
              {new Date(formValue.day?.id || dayId).toLocaleDateString()}
            </Text>
          </Box>
        )}
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
