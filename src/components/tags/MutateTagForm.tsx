import React from "react";
import { Keyboard, TextInput } from "react-native";

import { Box, Button, Text } from "@/atoms";
import { Tag } from "@/models";
import { useMutateTag } from "@/hooks/tag";
import { TagColorPicker } from "./TagColorPicker";

type Props = {
  tag?: Tag;
  onMutate?: () => void;
};

export const MutateTagForm = (props: Props) => {
  const { tag, onMutate } = props;

  const [formValue, setFormValue] = React.useState<Partial<Tag>>({});

  React.useEffect(() => {
    setFormValue(tag || {});
  }, [tag]);

  const handleInputChange = <T extends keyof Tag>(name: T, value: Tag[T]) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSuccess = () => {
    onMutate?.();
    setFormValue({});
  };

  const { mutate, deleteMutate } = useMutateTag({ onSuccess });

  const handleSubmit = () => {
    mutate(formValue);
    onMutate?.();
    Keyboard.dismiss();
  };

  const handleDelete = () => {
    deleteMutate(tag!.id);
  };

  return (
    <Box>
      <TextInput
        style={{ padding: 12, margin: 2, borderWidth: 1 }}
        value={formValue.name}
        onChangeText={(value) => handleInputChange("name", value)}
        placeholder="name"
      />
      <TagColorPicker
        color={tag?.color}
        onChange={(value) => handleInputChange("color", value)}
      />
      <Box alignItems="flex-end" gap="s">
        {tag ? (
          <>
            <Button onPress={handleSubmit}>
              <Text>Update</Text>
            </Button>
            <Button onPress={handleDelete}>
              <Text>Delete</Text>
            </Button>
          </>
        ) : (
          <Button onPress={handleSubmit}>
            <Text>Create</Text>
          </Button>
        )}
      </Box>
    </Box>
  );
};
