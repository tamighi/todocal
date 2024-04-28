import React from "react";

import { Container } from "@/atoms";
import { FormActionButtons, TextInput } from "@/components/core";
import { useDeleteOneTag, useUpdateTag } from "@/hooks";
import { Tag } from "@/models";

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

  const { mutate: updateMutate } = useUpdateTag({ onSuccess });
  const { mutate: deleteMutate } = useDeleteOneTag();

  const handleSubmit = () => {
    updateMutate(formValue as Tag);
  };

  const handleDelete = () => {
    deleteMutate(formValue as Tag);
    onSuccess?.();
  };

  return (
    <Container marginHorizontal="s" gap="m">
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
