import React from "react";

import { Container } from "@/atoms";
import { Tag } from "@/models";
import { FormActionButtons, TextInput } from "@/components/core";

import { TagColorPicker } from "./TagColorPicker";
import { useUpdate } from "@/hooks/queries/core/useUpdate";
import { useDeleteOneTag } from "@/hooks";

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

  const { mutate: updateMutate } = useUpdate("tag", { onSuccess });
  const { mutate: deleteMutate } = useDeleteOneTag({ onSuccess });

  const handleSubmit = () => {
    updateMutate(formValue);
  };

  const handleDelete = () => {
    deleteMutate(tag!.id);
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
