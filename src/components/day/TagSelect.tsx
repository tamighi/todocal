import { Tag } from "@/models";
import { useGetList } from "@/hooks";
import { Autocomplete } from "../core";

type Props = {
  value?: Tag;
  onChange?: (tag: Tag) => void;
};

export const TagSelect = (props: Props) => {
  const { value, onChange } = props;

  const { data } = useGetList("tag");

  return (
    <Autocomplete
      inputStyle={{ padding: 12, margin: 2 }}
      containerStyle={{ flex: 1 }}
      value={value}
      onChange={onChange}
      data={data}
      labelField="name"
      placeholder="TAGS"
    />
  );
};
