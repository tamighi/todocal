import React from "react";

import { Tag } from "@/models";
import { useGetList, useMutate } from "@/hooks";
import { Autocomplete } from "../core";

type Props = {
  value?: Tag;
  onChange?: (tag: Tag) => void;
};

export const TagSelect = React.memo((props: Props) => {
  const { value, onChange } = props;

  const { data: tags = [] } = useGetList("tag");

  const { mutate } = useMutate("tag", {
    onSuccess: (tag) => {
      onChange?.(tag);
    },
  });

  const [tagList, setTagList] = React.useState<Partial<Tag>[]>(tags);

  React.useEffect(() => {
    setTagList(tags);
  }, [tags]);

  const handleTextChange = (value: string) => {
    if (value === "" || !tags) return;
    setTagList([{ name: value }, ...tags]);
  };

  const handleChange = (tag: Partial<Tag>) => {
    if (!tag.id) {
      mutate(tag);
    } else {
      onChange?.(tag as Tag);
    }
  };

  return (
    <Autocomplete
      inputStyle={{ padding: 12, margin: 2 }}
      containerStyle={{ flex: 1 }}
      value={value}
      onChange={handleChange}
      onInputChange={handleTextChange}
      data={tagList}
      labelField="name"
      placeholder="TAGS"
    />
  );
});

TagSelect.displayName = "TagSelect";
