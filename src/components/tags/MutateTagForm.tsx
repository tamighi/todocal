import React from "react";

import { Container, TextInput } from "@/atoms";
import { Tag } from "@/models";
import { useMutateTag } from "@/hooks/queries";
import { FormActionButtons } from "@/components/core";

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
  };

  const handleDelete = () => {
    deleteMutate(tag!.id);
  };

  return (
    <Container gap="s">
      <TextInput
        value={formValue.name}
        onChangeText={(value) => handleInputChange("name", value)}
        placeholder="name"
        autoFocus
      />
      <TagColorPicker
        color={tag?.color}
        onChange={(value) => handleInputChange("color", value)}
      />

      <FormActionButtons
        marginTop="s"
        mode={tag ? "update" : "create"}
        onDeleteClick={handleDelete}
        onEditClick={handleSubmit}
        onCreateClick={handleSubmit}
      />
    </Container>
  );
};
