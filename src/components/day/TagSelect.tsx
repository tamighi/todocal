import React from "react";

import { TextInput, TextStyle, ViewStyle } from "react-native";

import { Box, Card, Text } from "@/atoms";
import { Tag } from "@/models";
import { useClickOutside, useGetList } from "@/hooks";

type Props = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: Tag;
  onChange?: (tag: Tag) => void;
};

export const TagSelect = (props: Props) => {
  const { value, onChange, containerStyle = {}, inputStyle = {} } = props;

  const [defaultValue, setDefaultValue] = React.useState(value);

  // DropDown

  const [selectOpen, setSelectOpen] = React.useState(false);

  const handleClickOutside = () => {
    setSelectOpen(false);
  };

  const ref = useClickOutside(handleClickOutside);

  const { data } = useGetList("tag");

  const handleInputPress = () => {
    setSelectOpen(!selectOpen);
  };

  return (
    <Box position="relative" style={containerStyle}>
      <TextInput
        onPressIn={handleInputPress}
        style={{ borderWidth: 1, ...inputStyle }}
        placeholder="TAGS"
      />
      <Card
        ref={ref}
        top="100%"
        left={0}
        right={0}
        margin="xs"
        zIndex={100}
        variant="primary"
        position="absolute"
        visible={selectOpen}
      >
        <Text>Hello world</Text>
      </Card>
    </Box>
  );
};
