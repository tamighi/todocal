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
    if (!tags) return;
    if (value.trim() === "") setTagList(tags);
    // If value already in tags do not add the value in list.
    else if (tags.find((tag) => tag.name === value.trim())) setTagList(tags);
    else setTagList([{ name: value }, ...tags]);
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
      data={tagList}
      value={value}
      onChange={handleChange}
      onInputChange={handleTextChange}
      labelField="name"
      placeholder="TAGS"
    />
  );
});

TagSelect.displayName = "TagSelect";
