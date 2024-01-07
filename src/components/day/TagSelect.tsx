import React from "react";

import { Tag } from "@/models";
import { useGetList, useMutate } from "@/hooks";
import { Box, Text } from "@/atoms";
import { Autocomplete } from "../core";

type Props = {
  value?: Tag;
  onChange?: (tag: Tag | null) => void;
};

export const TagSelect = React.memo((props: Props) => {
  const { value, onChange } = props;

  const { data: tags } = useGetList("tag");

  const { mutate } = useMutate("tag", {
    onSuccess: (tag) => {
      onChange?.(tag);
    },
  });

  const [tagList, setTagList] = React.useState<Partial<Tag>[]>(tags || []);

  React.useEffect(() => {
    setTagList(tags || []);
  }, [tags]);

  const handleTextChange = (value: string) => {
    if (!tags) return;
    if (value.trim() === "") {
      setTagList(tags);
      onChange?.(null);
    }
    // If value already in tags do not add the value in list.
    else if (tags.find((tag) => tag.name === value.trim())) setTagList(tags);
    else setTagList([{ name: value }, ...tags]);
  };

  const handleChange = (tag: Partial<Tag> | null) => {
    if (tag && !tag.id) {
      mutate(tag);
    } else {
      onChange?.(tag as Tag | null);
    }
  };

  const renderItem = React.useCallback(
    (tag: Partial<Tag>, index: number, data: Partial<Tag>[]) => {
      return (
        <Box
          justifyContent="space-between"
          flexDirection="row"
          padding="s"
          style={{
            backgroundColor: tag.color,
            borderBottomWidth: index === data.length - 1 ? 0 : 1,
          }}
        >
          <Text style={{ flex: 1 }}>{tag.name}</Text>
          {tag.id ? (
            <Box
              style={{
                margin: 4,
                width: 15,
                height: 15,
                backgroundColor: tag.color ? tag.color : "grey",
              }}
            />
          ) : (
            <Text marginHorizontal="s" style={{ color: "green" }}>
              +
            </Text>
          )}
        </Box>
      );
    },
    [],
  );

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
      renderItem={renderItem}
    />
  );
});

TagSelect.displayName = "TagSelect";
