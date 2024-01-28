import React from "react";

import { Container } from "@/atoms";
import { Tag } from "@/models";
import { useMutateTag } from "@/hooks/tag";

import { TagColorPicker } from "./TagColorPicker";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FormActionButtons } from "../core";

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
      <BottomSheetTextInput
        style={{ padding: 12, margin: 2, borderWidth: 1 }}
        value={formValue.name}
        onChangeText={(value) => handleInputChange("name", value)}
        placeholder="name"
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
